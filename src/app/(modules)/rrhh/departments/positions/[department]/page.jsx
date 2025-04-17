"use client"

import PositionsTable from "@/modules/rrhh/departments/tables/positions-table";
import DeleteDepartmentModal from "@/modules/rrhh/departments/modals/modal-delete-department";
import EditModal from "@/modules/rrhh/departments/modals/modal-edit-department";
import NewModal from "@/modules/rrhh/departments/modals/modal-new-department";
import { use } from 'react';
import { useState } from "react";

const PositionsExamples =[
    {
        id: 1,
        name: "Gerente de area",
        description: "El gerente del departamento",
        state: "Activo",
      },
      {
        id: 2,
        name: "Supervisor",
        description: "El supervisor del departamento",
        state: "Activo",
      },
      {
        id: 3,
        name: "Obrero",
        description: "El obrero del departamento",
        state: "Activo",
      },
]

const Positions = ({ params }) => {
  const { department } = use(params)
  const decodedDepartment = decodeURIComponent(department)
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
      <>
        <div className="w-full flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">Cargos del departamento: {decodedDepartment}</h1>
          <NewModal type="position"/>
        </div>
        <PositionsTable
          data={PositionsExamples}
          setSelectedPosition={setSelectedPosition}
          setOpenEdit={setOpenEdit}
          setOpenDelete={setOpenDelete}
        />
        <EditModal
          open={openEdit}
          onOpenChange={setOpenEdit}
          item={selectedPosition}
          type="position"
        />
        <DeleteDepartmentModal
          open={openDelete}
          onOpenChange={setOpenDelete}
          department={selectedPosition}
        />
      </>
  );
};
  
export default Positions;