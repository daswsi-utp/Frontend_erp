"use client"

import { useState } from "react";
import ContractsTable from "@/modules/rrhh/contrats/tables/ContractsTable";
import ShowContractModal from "@/modules/rrhh/contrats/modals/ContractModal";
import DeleteContractModal from "@/modules/rrhh/contrats/modals/ContractDelete";
import ContractNew from "@/modules/rrhh/contrats/modals/ContractNew";
import ContractEdit from "@/modules/rrhh/contrats/modals/ContractEdit";

const contracts = [
  {
    id: 1,
    employee:{
      id:1,
      firsName: "Daniel",
      lastName: "Cabrera Saavedra"
    },
    type: "Indefinido",
    startDate: '2004-10-20',
    endDate: '2080-10-20',
    status: "ACTIVO",
    file: "Archivito",
  },
  {
    id: 2,
    employee:{
      id: 2,
      firsName: "Estefani",
      lastName: "Davila"
    },
    type: "Indefinido",
    startDate: '2004-10-20',
    endDate: '2080-10-20',
    status: "ACTIVO",
    file: "Archivito",
  },
  {
    id: 3,
    employee:{
      id: 3,
      firsName: "Sebastián",
      lastName: "Ticlavilca"
    },
    type: "Indefinido",
    startDate: '2004-10-20',
    endDate: '2080-10-20',
    status: "FINALIZADO",
    file: "Archivito",
  },
  {
    id: 4,
    employee:{
      id: 4,
      firsName: "Valentina",
      lastName: "Martínez"
    },
    type: "Indefinido",
    startDate: '2004-10-20',
    endDate: '2080-10-20',
    status: "RESCINDIDO",
    file: "Archivito",
  },
]

const Contracts = () => {
  const [selectedContract, setSelectedContract] = useState(null);
  const [selectedFile, setSelectedFile] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [openContract, setOpenContract] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <>
      <div className="w-full flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">Contratos de la Organizacion</h1>
        <ContractNew/>
      </div>
      <ContractsTable
       contracts={contracts}
       setSelectedContract={setSelectedContract}
       setSelectedFile={setSelectedFile}
       setOpenContract={setOpenContract}
       setOpenDelete={setOpenDelete}
       setOpenEdit={setOpenEdit}
      />
      <ShowContractModal
        open={openContract}
        onOpenChange={setOpenContract}
        contract={setSelectedContract}
        onContractChange={setSelectedContract}
      />
      <DeleteContractModal
        open={openDelete}
        onOpenChange={setOpenDelete}
        contract={selectedContract}
      />
      <ContractEdit
        open={openEdit}
        onOpenChange={setOpenEdit}
        contract={selectedContract}
      />
    </>
  );
};
  
export default Contracts;