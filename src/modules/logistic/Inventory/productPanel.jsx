'use client';

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import useCrud from "@/hooks/useCrud";

export default function ProductosPanel() {
  const { getModel, postModel, putModel, deleteModel } = useCrud("");
  const [productos, setProductos] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [form, setForm] = useState(initialForm());
  const [editando, setEditando] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  function initialForm() {
    return {
      id: null,
      sku: "",
      nombre: "",
      marca: "",
      precio: "",
      proveedor: "",
    };
  }

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [prodData, provData] = await Promise.all([
        getModel("/logistic/products"),
        getModel("/logistic/providers"),
      ]);
      setProductos(prodData);
      setProveedores(provData);
    } catch (error) {
      console.error("Error cargando datos", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      sku: form.sku,
      nombre: form.nombre,
      marca: form.marca,
      precio: parseFloat(form.precio),
      proveedor: form.proveedor,
    };

    try {
      if (editando && form.id) {
        await putModel(`/logistic/products/${form.id}`, payload);
      } else {
        await postModel("/logistic/products", payload);
      }

      handleDialogClose();
      await loadData();
    } catch (error) {
      console.error("Error al guardar el producto", error);
    }
  };

  const handleEdit = (producto) => {
    setForm({
      id: producto.id,
      sku: producto.sku,
      nombre: producto.nombre,
      marca: producto.marca,
      precio: producto.precio,
      proveedor: producto.proveedor,
    });
    setEditando(true);
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteModel(`/logistic/products/${id}`);
      await loadData();
    } catch (error) {
      console.error("Error al eliminar producto", error);
    }
  };

  const handleDialogClose = () => {
    setForm(initialForm());
    setEditando(false);
    setDialogOpen(false);
  };

  const getProveedorNombre = (id) => {
    const prov = proveedores.find((p) => p.id_proveedor === id);
    return prov ? prov.nombre : "Sin proveedor";
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>📦 Gestión de Productos</CardTitle>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              handleDialogClose();
              setDialogOpen(true);
            }}>
              + Nuevo producto
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <h2 className="text-xl font-semibold">
                {editando ? "Editar producto" : "Nuevo producto"}
              </h2>

              <div>
                <Label>SKU</Label>
                <Input name="sku" value={form.sku} onChange={handleChange} required />
              </div>
              <div>
                <Label>Nombre</Label>
                <Input name="nombre" value={form.nombre} onChange={handleChange} required />
              </div>
              <div>
                <Label>Marca</Label>
                <Input name="marca" value={form.marca} onChange={handleChange} required />
              </div>
              <div>
                <Label>Precio</Label>
                <Input
                  type="number"
                  name="precio"
                  value={form.precio}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>Proveedor</Label>
                <Select
                  value={form.proveedor}
                  onValueChange={(v) => setForm({ ...form, proveedor: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un proveedor" />
                  </SelectTrigger>
                  <SelectContent>
                    {proveedores.map((p) => (
                      <SelectItem key={p.id_proveedor} value={p.id_proveedor.toString()}>
                        {p.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={handleDialogClose}>
                  Cancelar
                </Button>
                <Button type="submit">{editando ? "Actualizar" : "Guardar"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Proveedor</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productos.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.sku}</TableCell>
                <TableCell>{p.nombre}</TableCell>
                <TableCell>{p.marca}</TableCell>
                <TableCell>${p.precio}</TableCell>
                <TableCell>{getProveedorNombre(p.proveedor)}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" onClick={() => handleEdit(p)}>Editar</Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(p.id)}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}