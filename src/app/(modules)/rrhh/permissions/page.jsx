"use client"

import { useState } from "react";
import PermisionsTable from "@/modules/rrhh/permisions/tables/PermisionsTable";
import PermisionNew from "@/modules/rrhh/permisions/modals/NewPermision";
import PermisionEdit from "@/modules/rrhh/permisions/modals/EditPermision";
import DeletePermisionModal from "@/modules/rrhh/permisions/modals/DeletePermision";

const permisions = [
  {
    id: 1,
    employee: {
      id: 1,
      firstName: "Daniel",
      lastName: "Cabrera"
    },
    startDate: '2025-04-21',
    endDate: '2026-04-21',
    daysTaken: '70',
    status: 'APROVADO',
    requestedAt: '2004-10-20',
    type: 'ENFERMEDAD'
  },
  {
    id: 2,
    employee: {
      id: 2,
      firstName: "Miriam",
      lastName: "Estremadollo"
    },
    startDate: '2026-04-21',
    endDate: '2027-04-21',
    daysTaken: '70',
    status: 'PENDIENTE',
    requestedAt: '2025-04-20',
    type: 'MATERNIDAD'
  },
  {
    id: 3,
    employee: {
      id: 1,
      firstName: "Daniel",
      lastName: "Cabrera"
    },
    startDate: '2027-04-21',
    endDate: '2028-04-21',
    daysTaken: '70',
    status: 'DESAPROVADO',
    requestedAt: '2004-10-20',
    type: 'LUTO'
  }
];

const Permisions = () => {

    const [selectedPermision, setSelectedPermision] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    return (
      <>
        <div className="w-full flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">Registrar Permisos</h1>
          <PermisionNew/>
        </div>
        <PermisionsTable
          permisions={permisions}
          setSelectedPermision={setSelectedPermision}
          setOpenDelete={setOpenDelete}
          setOpenEdit={setOpenEdit}
        />
        <PermisionEdit
          open={openEdit}
          onOpenChange={setOpenEdit}
          permision={selectedPermision}
        />
        <DeletePermisionModal
          open={openDelete}
          onOpenChange={setOpenDelete}
          permision={selectedPermision}
        />
      </>
    );
};
export default Permisions;
  