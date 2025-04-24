"use client";

import MaterialsTable from "@/modules/manufacture/manufacturingProducts/tables/materials";
import DeleteMaterialModal from "@/modules/manufacture/manufacturingProducts/modals/modalDeleteMaterials";
import EditMaterialModal from "@/modules/manufacture/manufacturingProducts/modals/modalEditMaterials";
import NewMaterialModal from "@/modules/manufacture/manufacturingProducts/modals/modalNewMaterials";
import { use } from 'react';
import { useState } from "react";


const MaterialsExamples = [
  {
    id: 1,
    name: "Madera Pino",
    quantity: "5",
    unit: "Tablas",
    state: "Disponible",
  },
  {
    id: 2,
    name: "Clavos de acero",
    quantity: "30",
    unit: "Unidades",
    state: "Disponible",
  },
  {
    id: 3,
    name: "Barniz",
    quantity: "1",
    unit: "Litro",
    state: "Disponible",
  },
];

const Materials = ({ params }) => {
  const { product } = use(params);
  const decodedProduct = decodeURIComponent(product);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <>
      <div className="w-full flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">
          Materiales del producto: {decodedProduct}
        </h1>
        <NewMaterialModal />
      </div>
      <MaterialsTable
        data={MaterialsExamples}
        setSelectedMaterial={setSelectedMaterial}
        setOpenEdit={setOpenEdit}
        setOpenDelete={setOpenDelete}
      />
      <EditMaterialModal
        open={openEdit}
        onOpenChange={setOpenEdit}
        item={selectedMaterial}
      />
      <DeleteMaterialModal
        open={openDelete}
        onOpenChange={setOpenDelete}
        material={selectedMaterial}
      />
    </>
  );
};

export default Materials;