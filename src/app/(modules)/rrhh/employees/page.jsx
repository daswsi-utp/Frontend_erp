"use client"

import React, { useEffect, useState } from "react";
import EmployeesTable from "@/modules/rrhh/employees/tables/employees-table";
import EditEmployeeModal from "@/modules/rrhh/employees/modals/modal-edit-employee";
import NewEmployee from "@/modules/rrhh/employees/modals/modal-new-employee";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import useCrud from "@/hooks/useCrud";

const Employees = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const {getModel, deleteModel} = useCrud("/rrhh/employee")
  const [employees, setEmployees] = useState({});

  const fetchEmployees = async () =>{
    try {
      const data = await getModel();
      setEmployees(data);
    } catch (error) {
      console.error("error cargando empleados");
    }
  }

  const deleteEmployee = async (employee) =>{
    try {
      console.log(`/rrhh/employee/${employee.id}`)
      await deleteModel(`/rrhh/employee/${employee.id}`);
      await fetchEmployees();
    } catch (error) {
      console.error("Error during delete employee", error)
    }
  }

  useEffect(() => {
  fetchEmployees();
}, []);

  return (
    <>
      <div className="w-full flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">Empleados de la Organización</h1>
        <NewEmployee
          fetchEmployees={fetchEmployees}
        />
      </div>
      <Card>
        <CardContent>
          <EmployeesTable
            data={employees}
            setSelectedEmployee={setSelectedEmployee}
            setOpenEdit={setOpenEdit}
            deleteEmployee={deleteEmployee}
          />
          <EditEmployeeModal
            open={openEdit}
            onOpenChange={setOpenEdit}
            employee={selectedEmployee}
            onEmployeeChange={setSelectedEmployee}
            fetchEmployees={fetchEmployees}
          />
        </CardContent>
      </Card>
    </>
  );
};
  
export default Employees;