"use client"
import React, { useEffect, useState } from "react";
import EmployeesTable from "@/modules/rrhh/employees/tables/employees-table";
import EditEmployeeModal from "@/modules/rrhh/employees/modals/modal-edit-employee";
import NewEmployee from "@/modules/rrhh/employees/modals/modal-new-employee";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import useCrud from "@/hooks/useCrud";
import useFetchEmployees from "@/app/hooks/rrhh/useFetchEmployees";
import { useQueryClient } from "@tanstack/react-query";


const Employees = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const queryClient = useQueryClient();
  const {deleteModel} = useCrud("")
  const { data: employeesData, isLoading, error } = useFetchEmployees()

  const reload = async (employee) =>{
    await queryClient.invalidateQueries(['employees']);
  }

  const deleteEmployee = async (employee) =>{
    try {
      console.log(`/rrhh/employee/${employee.id}`)
      await deleteModel(`/rrhh/employee/${employee.id}`);
      await queryClient.invalidateQueries(['employees']);
    } catch (error) {
      console.error("Error during delete employee", error)
    }
  }

  return (
    <>
      <div className="w-full flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">Empleados de la Organización</h1>
        <NewEmployee/>
      </div>
      <Card>
        <CardContent>
          <EmployeesTable
            data={employeesData}
            setSelectedEmployee={setSelectedEmployee}
            setOpenEdit={setOpenEdit}
            deleteEmployee={deleteEmployee}
          />
          <EditEmployeeModal
            open={openEdit}
            onOpenChange={setOpenEdit}
            employee={selectedEmployee}
            onEmployeeChange={setSelectedEmployee}
          />
        </CardContent>
      </Card>
    </>
  );
};
  
export default Employees;