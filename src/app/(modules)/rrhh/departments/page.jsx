"use client"

import { useState } from "react";
import DepartmentsTable from "@/modules/rrhh/departments/tables/departments-table";
import EditModal from "@/modules/rrhh/departments/modals/modal-edit-department";
import DeleteDepartmentModal from "@/modules/rrhh/departments/modals/modal-delete-department";
import NewModal from "@/modules/rrhh/departments/modals/modal-new-department";

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

const Departments = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <>
      <div className="w-full flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">Departamentos de la Organización</h1>
        <NewModal type="department"/>
      </div>
      <DepartmentsTable
          data={departmens}
          setSelectedDepartment={setSelectedDepartment}
          setOpenEdit={setOpenEdit}
          setOpenDelete={setOpenDelete}
      />
      <EditModal
        open={openEdit}
        onOpenChange={setOpenEdit}
        item={selectedDepartment}
        type="department"
      />

      <DeleteDepartmentModal
        open={openDelete}
        onOpenChange={setOpenDelete}
        department={selectedDepartment}
      />
    </>
  );
};
  
export default Departments;