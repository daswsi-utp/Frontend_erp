'use client';

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import InventoryFilters from "./inventoryFilters";
import InventoryTable from "./inventoryTable";
import InventoryForm from "./inventoryForm";
import useCrud from "@/hooks/useCrud";

export default function InventoryPanel() {
  const {
    getModel: getProducts,
    insertModel: insertProduct,
    updateModel: updateProduct,
    deleteModel: deleteProduct,
  } = useCrud("/logistic/products");

  const { getModel: getInventory } = useCrud("/logistic/inventory");
  const { getModel: getProviders } = useCrud("/logistic/providers");
  const { getModel: getBranches } = useCrud("/logistic/branches");

  const [inventarios, setInventarios] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [inventoryData, providersData, branchesData] = await Promise.all([
        getInventory(),
        getProviders(),
        getBranches(),
      ]);

      setInventarios(inventoryData);
      setFiltered(inventoryData);
      setProveedores(providersData);
      setSucursales(branchesData);
    } catch (error) {
      console.error("Error al cargar datos", error);
    }
  };

  const handleFilter = (filters) => {
    const result = inventarios.filter((item) => {
      const estado =
        item.stock <= item.stock_minimo
          ? "Bajo"
          : item.stock >= item.stock_maximo
          ? "Alto"
          : "Regular";

      return (
        item.sku.toLowerCase().includes(filters.sku.toLowerCase()) &&
        item.nombre.toLowerCase().includes(filters.nombre.toLowerCase()) &&
        (filters.marca === "" || item.marca === filters.marca) &&
        (filters.precio === "" ||
          (filters.precio === "1001"
            ? item.precio >= 1000
            : item.precio <= parseFloat(filters.precio))) &&
        (filters.proveedor === "" || item.proveedor === filters.proveedor) &&
        (filters.stock === "" ||
          (filters.stock === "60"
            ? item.stock >= 60
            : item.stock <= parseInt(filters.stock))) &&
        (filters.ubicacion === "" || item.ubicacion === filters.ubicacion) &&
        (filters.estado === "" || estado === filters.estado) &&
        (filters.sucursal === "" || filters.sucursal === "Todas" || item.sucursal_nombre === filters.sucursal)
      );
    });

    setFiltered(result);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleDelete = async (item) => {
    try {
      await deleteProduct(`/${item.id}`);
      loadData();
    } catch (error) {
      console.error("Error al eliminar el producto", error);
    }
  };

  const handleSubmit = async (item) => {
    try {
      if (item.id) {
        await updateProduct(item, `/${item.id}`);
      } else {
        await insertProduct(item);
      }
      setModalOpen(false);
      loadData();
    } catch (error) {
      console.error("Error al guardar el producto", error);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Filtrar los Productos del Inventario</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <InventoryFilters
            inventarios={inventarios}
            proveedores={proveedores}
            sucursales={sucursales}
            onFilter={handleFilter}
          />
          <InventoryTable
            inventarios={filtered}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Editar producto" : "Añadir producto al inventario"}
            </DialogTitle>
          </DialogHeader>
          <InventoryForm
            initialData={editingItem}
            proveedores={proveedores}
            sucursales={sucursales}
            onSubmit={handleSubmit}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}