"use client"
import React, { useEffect, useState } from "react";
import ContractsTable from "@/modules/rrhh/contrats/tables/ContractsTable";
import ShowContractModal from "@/modules/rrhh/contrats/modals/ContractModal";
import ContractNew from "@/modules/rrhh/contrats/modals/ContractNew";
import ContractEdit from "@/modules/rrhh/contrats/modals/ContractEdit";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import useCrud from "@/hooks/useCrud";


const Contracts = () => {
  const [selectedContract, setSelectedContract] = useState(null);
  const [selectedFile, setSelectedFile] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [openContract, setOpenContract] = useState(false);

  const {getModel, deleteModel} = useCrud("/rrhh/contract")
  const [contracts, setContracts] = useState([]);

  const fetchContracts = async () =>{
    try {
      const data = await getModel();
      setContracts(data);
    } catch (error) {
      console.error("Error recovery contracts");
    }
  }

  const deleteContract = async (contract) =>{
    try {
      console.log(`/rrhh/contract/${contract.id}`)
      await deleteModel(`/rrhh/contract/${contract.id}`);
      await fetchContracts();
    } catch (error) {
      console.error("Error during delete contract", error)
    }
  }

  useEffect(() => {
    fetchContracts();
  }, []);

  return (
    <>
      <div className="w-full flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">Contratos de la Organizacion</h1>
        <ContractNew fetchContracts={fetchContracts}/>
      </div>
      <Card>
        <CardContent>
          <ContractsTable
            contracts={contracts}
            setSelectedContract={setSelectedContract}
            deleteContract={deleteContract}
            setOpenContract={setOpenContract}
            setOpenEdit={setOpenEdit}
          />
          <ShowContractModal
            open={openContract}
            onOpenChange={setOpenContract}
            contract={selectedContract}
            onContractChange={setSelectedContract}
          />
          <ContractEdit
            open={openEdit}
            onOpenChange={setOpenEdit}
            contract={selectedContract}
          />
        </CardContent>
      </Card>
    </>
  );
};
  
export default Contracts;