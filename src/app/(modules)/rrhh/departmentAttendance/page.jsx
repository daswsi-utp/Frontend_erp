"use client"

import DepartmentsTable from "@/modules/rrhh/departmentAttendance/tables/departments-table";

const departmens = [
  {
    id: 1,
    name: "Recursos Humanos",
    manager: "Daniel Cabrera Saavedra",
    state: "Activo",
    code: "RRHH",
  },
  {
    id: 2,
    name: "Planeacion",
    manager: "Pinwino",
    state: "Activo",
    code: "PL",
  },
  {
    id: 3,
    name: "Client Relation Managment",
    manager: "Estefani",
    state: "Activo",
    code: "CRM",
  },
  {
    id: 4,
    name: "Inventario",
    manager: "Sebastian",
    state: "Activo",
    code: "IV",
  },
  {
    id: 5,
    name: "Manufactura",
    manager: "Elvis",
    state: "Activo",
    code: "MNF",
  },
]

const JustifyAttendance = () => {
  return (
    <>
      <div className="w-full flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">Seleccione el departamento para ver las asistencias</h1>
      </div>
      <DepartmentsTable
          data={departmens}
      />
    </>
  );
};
export default JustifyAttendance;
