"use client"
import React, { useEffect, useState } from "react";
import DepartmentsTable from "@/modules/rrhh/departments/tables/departments-table";
import EditModal from "@/modules/rrhh/departments/modals/modal-edit-department";
import NewDepartment from "@/modules/rrhh/departments/modals/modal-new-department";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import useFetchDepartments from "@/modules/rrhh/hooks/useFetchDepartments";
import useEntityMutation from "@/hooks/useEntityMutation";

const Departments = () => {
  const {data}=useFetchDepartments();
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const departmentMutation = useEntityMutation('department')

  const deleteDepartment = async (department) =>{
    try {
      console.log(`/rrhh/department/${department.id}`)
      departmentMutation.mutate({
        action: 'delete',
        id: department.id,
        entity: {},
        apiPath: `/rrhh/department/${department.id}`
      })
    } catch (error) {
      console.error("Error during delete department", error)
    }
  }


  return (
    <>
      <div className="w-full flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">Departamentos de la Organización</h1>
        <NewDepartment/>
      </div>
      <Card>
        <CardContent>
          <DepartmentsTable
              data={data?.rows || []}
              setSelectedDepartment={setSelectedDepartment}
              setOpenEdit={setOpenEdit}
              deleteDepartment={deleteDepartment}
          />
          <EditModal
            open={openEdit}
            onOpenChange={setOpenEdit}
            item={selectedDepartment}
            onItemChange={setSelectedDepartment}
          />
        </CardContent>
      </Card>
    </>
  );
};
  
export default Departments;