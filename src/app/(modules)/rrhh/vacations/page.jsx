"use client"

import { useState } from "react";
import VacationsTable from "@/modules/rrhh/vacations/tables/VacationsTable";
import VacationNew from "@/modules/rrhh/vacations/modals/NewVacationModal";
import VacationEdit from "@/modules/rrhh/vacations/modals/EditVacationModal";
import DeleteVacationModal from "@/modules/rrhh/vacations/modals/DeleteVacationModal";

const vacations = [
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
    requestedAt: '2004-10-20'
  },
  {
    id: 2,
    employee: {
      id: 1,
      firstName: "Daniel",
      lastName: "Cabrera"
    },
    startDate: '2026-04-21',
    endDate: '2027-04-21',
    daysTaken: '70',
    status: 'PENDIENTE',
    requestedAt: '2025-04-20'
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
    requestedAt: '2004-10-20'
  }
];

const Vacations = () => {

  const [selectedVacation, setSelectedVacation] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

    return (
      <>
        <div className="w-full flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">Vacaciones Registradas</h1>
          <VacationNew/>
        </div>
        <VacationsTable
          vacations={vacations}
          setSelectedVacation={setSelectedVacation}
          setOpenDelete={setOpenDelete}
          setOpenEdit={setOpenEdit}
        />
        <VacationEdit
          open={openEdit}
          onOpenChange={setOpenEdit}
          vacation={selectedVacation}
        />
        <DeleteVacationModal
          open={openDelete}
          onOpenChange={setOpenDelete}
          vacation={selectedVacation}
        />
      </>
    );
};
  
export default Vacations;