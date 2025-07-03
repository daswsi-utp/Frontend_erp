"use client"

import React, { useEffect, useState } from "react";
import VacationsTable from "@/modules/rrhh/vacations/tables/VacationsTable";
import VacationNew from "@/modules/rrhh/vacations/modals/NewVacationModal";
import VacationEdit from "@/modules/rrhh/vacations/modals/EditVacationModal";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import useCrud from "@/hooks/useCrud";
import useFetchVacations from "@/modules/rrhh/hooks/useFetchVacations";
import useEntityMutation from "@/hooks/useEntityMutation";

const Vacations = () => {

  const {data} = useFetchVacations();
  const vacationMutation = useEntityMutation('vacation')
  const [selectedVacation, setSelectedVacation] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  const deleteVacation = async (vacation) =>{
    try {
      console.log(`/rrhh/vacation/${vacation.id}`)
      vacationMutation.mutate({
        action: 'delete',
        id: vacation.id,
        entity: {},
        apiPath: `/rrhh/vacation/${vacation.id}`
      })
    } catch (error) {
      console.error("Error during delete department", error)
    }
  }

    return (
      <>
        <div className="w-full flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">Vacaciones Registradas</h1>
          <VacationNew />
        </div>
        <Card>
          <CardContent>
            <VacationsTable
              vacations={data?.rows || []}
              setSelectedVacation={setSelectedVacation}
              setOpenEdit={setOpenEdit}
              deleteVacation={deleteVacation}
            />
            <VacationEdit
              open={openEdit}
              onOpenChange={setOpenEdit}
              vacation={selectedVacation}
            />
          </CardContent>
        </Card>
      </>
    );
};
  
export default Vacations;