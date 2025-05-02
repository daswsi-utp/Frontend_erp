"use client"

import { useState } from "react";
import EmployeesTable from "@/modules/rrhh/employees/tables/employees-table";
import EditEmployeeModal from "@/modules/rrhh/employees/modals/modal-edit-employee";
import DeleteEmployeeModal from "@/modules/rrhh/employees/modals/modal.delete-employee";
import NewEmployee from "@/modules/rrhh/employees/modals/modal-new-employee";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const employees = [
  {
    id: 1,
    firstName: "Daniel",
    lastName: "Cabrera",
    dni: "12345678",
    email: "daniel@example.com",
    phoneNumber: "999999999",
    address: "Av. avenida 123",
    birthDate: "2004-10-20",
    gender: "MALE",
    department:{
      id:1,
      name: "Recursos Humanos",
      code: "RRHH"
    },
    position:{
      id:1,
      name: "Gerente de Area",
    },
    hireDate: "2022-01-15",
    contractType: "Indefinido",
    employeeCode: "EMP-001",
    state: "Activo",
    emergencyContactName: "Hanna",
    emergencyContactPhone: "123456789"
  },
  {
    id: 2,
    firstName: "Estefani",
    lastName: "Davila",
    dni: "87654321",
    email: "estefani@example.com",
    phoneNumber: "988877766",
    address: "Calle calle 456",
    birthDate: "1998-03-15",
    gender: "FEMALE",
    department: {
      id:2,
      name: "Client Relation Managment",
      code: "CRM",
    },
    position: {
      id:1,
      name: "Gerente de Area",
    },
    hireDate: "2021-06-20",
    contractType: "Temporal",
    employeeCode: "EMP-002",
    state: "Activo",
    emergencyContactName: "Juan",
    emergencyContactPhone: "987654321"
  },
  {
    id: 3,
    firstName: "Sebastián",
    lastName: "Ticlavilca",
    dni: "X1234567",
    email: "sebastian@example.com",
    phoneNumber: "977766655",
    address: "Av. Independencia 789",
    birthDate: "1992-07-30",
    gender: "MALE",
    department: {
      id:3,
      name: "Inventario",
      code: "IV",
    },
    position: {
      id:2,
      name: "Ejecutivo de Inventario",
    },
    hireDate: "2020-11-01",
    contractType: "Indefinido",
    employeeCode: "EMP-003",
    state: "Desactivado",
    emergencyContactName: "Pedro",
    emergencyContactPhone: "111222333"
  },
  {
    id: 4,
    firstName: "Valentina",
    lastName: "Martínez",
    dni: "44556677",
    email: "valentina@example.com",
    phoneNumber: "966655544",
    address: "Jirón Las Flores 101",
    birthDate: "1995-12-05",
    gender: "FEMALE",
    department: {
      id:4,
      name: "Finanzas",
      code: "FI",
    },
    position: {
      id:3,
      name: "Contadora",
    },
    hireDate: "2023-02-10",
    contractType: "Indefinido",
    employeeCode: "EMP-004",
    state: "Vacaciones",
    emergencyContactName: "Mario",
    emergencyContactPhone: "999888777"
  },
]

const Employees = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  return (
    <>
      <div className="w-full flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">Empleados de la Organización</h1>
        <NewEmployee/>
      </div>
      <Card>
        <CardContent>
          <EmployeesTable
            data={employees}
            setSelectedEmployee={setSelectedEmployee}
            setOpenEdit={setOpenEdit}
            setOpenDelete={setOpenDelete}
          />
          <EditEmployeeModal
            open={openEdit}
            onOpenChange={setOpenEdit}
            employee={selectedEmployee}
            onEmployeeChange={setSelectedEmployee}
          />
          <DeleteEmployeeModal
            open={openDelete}
            onOpenChange={setOpenDelete}
            employee={selectedEmployee}
          />
        </CardContent>
      </Card>
    </>
  );
};
  
export default Employees;