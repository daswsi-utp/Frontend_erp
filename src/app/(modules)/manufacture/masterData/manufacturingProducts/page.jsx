"use client";

import { useState } from "react";
import FinishedProductsTable from "@/modules/manufacture/manufacturingProducts/tables/products";
import NewMaterialsModal from "@/modules/manufacture/manufacturingProducts/modals/modalNewMaterials";
import EditMaterialsModal from "@/modules/manufacture/manufacturingProducts/modals/modalEditMaterials";
import DeleteMaterialsModal from "@/modules/manufacture/manufacturingProducts/modals/modalDeleteMaterials";

const finishedProducts = [
  {
    id: 1,
    code: "PRD-001",
    name: "Producto A",
    category: "Limpieza",
    unitMeasure: "Litros",
    unit: 2,
    state: "listo",

    quantity: 100,
    cost: 5.0,
    createdAt: "2023-05-12",
  },
  {
    id: 2,
    code: "PRD-002",
    name: "Producto B",
    category: "Higiene",
    unit: 2,
    state: "listo",

    unitMeasure: "Unidades",
    quantity: 200,
    cost: 2.5,
    createdAt: "2023-06-20",
  },
  {
    id: 3,
    code: "PRD-003",
    name: "Producto C",
    category: "Alimentos",
    unit: 2,
    state: "listo",

    unitMeasure: "Kg",
    quantity: 75,
    cost: 8.25,
    createdAt: "2023-08-10",
  },
];

const FinishedProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <>
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">
          Productos Terminados
        </h1>
        <NewMaterialsModal />
      </div>

      <FinishedProductsTable
        data={finishedProducts}
        setSelectedProduct={setSelectedProduct}
        setOpenEdit={setOpenEdit}
        setOpenDelete={setOpenDelete}
      />

      <EditMaterialsModal
        open={openEdit}
        onOpenChange={setOpenEdit}
        product={selectedProduct}
        onProductChange={setSelectedProduct}
      />

      <DeleteMaterialsModal
        open={openDelete}
        onOpenChange={setOpenDelete}
        product={selectedProduct}
      />
    </>
  );
};

export default FinishedProducts;



/*
"use client";

import { useState } from "react";
import FinishedProductsTable from "@/modules/products/finished/tables/finished-products-table";
import NewFinishedProductModal from "@/modules/products/finished/modals/modal-new-finished-product";
import EditFinishedProductModal from "@/modules/products/finished/modals/modal-edit-finished-product";
import DeleteFinishedProductModal from "@/modules/products/finished/modals/modal-delete-finished-product";

// Datos simulados
const finishedProducts = [
  {
    id: 1,
    code: "PRD-001",
    name: "Detergente Multiuso",
    category: "Limpieza",
    unitMeasure: "Litros",
    quantity: 250,
    cost: 3.50,
    createdAt: "2024-07-01",
  },
  {
    id: 2,
    code: "PRD-002",
    name: "Jabón Líquido",
    category: "Higiene",
    unitMeasure: "Litros",
    quantity: 180,
    cost: 2.75,
    createdAt: "2024-07-05",
  },
  {
    id: 3,
    code: "PRD-003",
    name: "Alcohol en Gel",
    category: "Desinfección",
    unitMeasure: "Unidades",
    quantity: 300,
    cost: 1.80,
    createdAt: "2024-07-10",
  },
];

const FinishedProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <>
      <div className="w-full flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">
          Productos Terminados
        </h1>
        <NewFinishedProductModal />
      </div>

      <FinishedProductsTable
        data={finishedProducts}
        setSelectedProduct={setSelectedProduct}
        setOpenEdit={setOpenEdit}
        setOpenDelete={setOpenDelete}
      />

      <EditFinishedProductModal
        open={openEdit}
        onOpenChange={setOpenEdit}
        product={selectedProduct}
      />

      <DeleteFinishedProductModal
        open={openDelete}
        onOpenChange={setOpenDelete}
        product={selectedProduct}
      />
    </>
  );
};

export default FinishedProducts;

*/
