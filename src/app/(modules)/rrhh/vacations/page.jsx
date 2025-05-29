"use client"

import React, { useEffect, useState } from "react";
import VacationsTable from "@/modules/rrhh/vacations/tables/VacationsTable";
import VacationNew from "@/modules/rrhh/vacations/modals/NewVacationModal";
import VacationEdit from "@/modules/rrhh/vacations/modals/EditVacationModal";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import useCrud from "@/hooks/useCrud";

const Vacations = () => {

  const [selectedVacation, setSelectedVacation] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  const {getModel, deleteModel} = useCrud("/rrhh/vacation")
  const [vacations, setVacations] = useState([]);

  const fetchVacations = async () =>{
    try {
      const data = await getModel();
      setVacations(data);
    } catch (error) {
      console.error("Error recovery vacations");
    }
  }

  useEffect(() => {
    fetchVacations();
  }, []);

    return (
      <>
        <div className="w-full flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">Vacaciones Registradas</h1>
          <VacationNew/>
        </div>
        <Card>
          <CardContent>
            <VacationsTable
              vacations={vacations}
              setSelectedVacation={setSelectedVacation}
              setOpenEdit={setOpenEdit}
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