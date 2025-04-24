"use client"

import AttendanceTable from "@/modules/rrhh/departmentAttendance/tables/attendance-table";
import { use } from 'react';
import { useState } from "react";
import EditAttendanceModal from "@/modules/rrhh/departmentAttendance/modals/EditAttendance";

const employees = [
    {
      id: 1,
      firstName: "Daniel",
      lastName: "Cabrera",
      documentType: "DNI",
      documentNumber: "12345678",
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
      emergencyContact: {
        name: "Hanna",
        phone: "999888777"
      },
    },
    {
      id: 2,
      firstName: "Estefani",
      lastName: "Davila",
      documentType: "DNI",
      documentNumber: "87654321",
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
        id:2,
        name: "Gerente de Area",
      },
      hireDate: "2021-06-20",
      contractType: "Temporal",
      employeeCode: "EMP-002",
      state: "Activo",
      emergencyContact: {
        name: "Juan",
        phone: "911122233",
      },
    },
    {
      id: 3,
      firstName: "Sebastián",
      lastName: "Ticlavilca",
      documentType: "Pasaporte",
      documentNumber: "X1234567",
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
        id:3,
        name: "Ejecutivo de Inventario",
      },
      hireDate: "2020-11-01",
      contractType: "Indefinido",
      employeeCode: "EMP-003",
      state: "Activo",
      emergencyContact: {
        name: "Laura Lopez",
        phone: "922233344",
      },
    },
    {
      id: 4,
      firstName: "Valentina",
      lastName: "Martínez",
      documentType: "DNI",
      documentNumber: "44556677",
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
        id:4,
        name: "Contadora",
      },
      hireDate: "2023-02-10",
      contractType: "Indefinido",
      employeeCode: "EMP-004",
      state: "Activo",
      emergencyContact: {
        name: "Mario Martínez",
        phone: "955112233",
      },
    },
  ]

const Attendance = ({ params }) => {
  const { department } = use(params)
  const decodedDepartment = decodeURIComponent(department)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [openEdit, setOpenEdit] = useState(false)

  return (
    <>
        <div className="w-full flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">Asistencias del departamento: {decodedDepartment}</h1>
        </div>
        <AttendanceTable
            data={employees}
            setSelectedEmployee={setSelectedEmployee}
            setOpenEdit={setOpenEdit}
        />
        <EditAttendanceModal
            open={openEdit}
            onOpenChange={setOpenEdit}
            employee={selectedEmployee}
        />

    </>
  );
};
  
export default Attendance;