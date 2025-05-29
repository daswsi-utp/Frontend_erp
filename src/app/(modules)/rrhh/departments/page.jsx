"use client"

import React, { useEffect, useState } from "react";
import DepartmentsTable from "@/modules/rrhh/departments/tables/departments-table";
import EditModal from "@/modules/rrhh/departments/modals/modal-edit-department";
import NewDepartment from "@/modules/rrhh/departments/modals/modal-new-department";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import useCrud from "@/hooks/useCrud";

const Departments = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const {getModel, deleteModel} = useCrud("/rrhh/department")
  const [departments, setDepartments] = useState({});

  const fetchDepartments = async () =>{
    try {
      const data = await getModel();
      setDepartments(data);
    } catch (error) {
      console.error("Error recovery departments");
    }
  }

  const deleteDepartment = async (department) =>{
    try {
      console.log(`/rrhh/department/${department.id}`)
      await deleteModel(`/rrhh/department/${department.id}`);
      await fetchDepartments();
    } catch (error) {
      console.error("Error during delete department", error)
    }
  }

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <>
      <div className="w-full flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">Departamentos de la Organización</h1>
        <NewDepartment fetchDepartments={fetchDepartments} />
      </div>
      <Card>
        <CardContent>
          <DepartmentsTable
              data={departments}
              setSelectedDepartment={setSelectedDepartment}
              setOpenEdit={setOpenEdit}
              deleteDepartment={deleteDepartment}
          />
          <EditModal
            open={openEdit}
            onOpenChange={setOpenEdit}
            item={selectedDepartment}
            onItemChange={setSelectedDepartment}
            fetchDepartments={fetchDepartments}
          />
        </CardContent>
      </Card>
    </>
  );
};
  
export default Departments;