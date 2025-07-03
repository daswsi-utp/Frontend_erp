"use client"
import React, { useEffect, useState } from "react";
import EmployeesTable from "@/modules/rrhh/employees/tables/employees-table";
import EditEmployeeModal from "@/modules/rrhh/employees/modals/modal-edit-employee";
import NewEmployee from "@/modules/rrhh/employees/modals/modal-new-employee";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import useEntityMutation from "@/hooks/useEntityMutation";
import useFetchEmployees from "@/modules/rrhh/hooks/useFetchEmployee";


const Employees = () => {
  const employeeMutation = useEntityMutation('employee')
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const { data, isLoading } = useFetchEmployees()

  const deleteEmployee = async (employee) =>{
    try {
      employeeMutation.mutate({
        action: 'delete',
        id: employee.id,
        entity: {},
        apiPath: `/rrhh/employee/${employee.id}`
      })
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
            data={data?.rows || [] }
            isLoading={isLoading}
            setSelectedEmployee={setSelectedEmployee}
            setOpenEdit={setOpenEdit}
            deleteEmployee={deleteEmployee}
          />
        </CardContent>
      </Card>
      <EditEmployeeModal
        open={openEdit}
        onOpenChange={setOpenEdit}
        employee={selectedEmployee}
        onEmployeeChange={setSelectedEmployee}
      />
    </>
  );
};
  
export default Employees;