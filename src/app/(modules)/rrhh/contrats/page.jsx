"use client"
import React, { useEffect, useState } from "react";
import ContractsTable from "@/modules/rrhh/contrats/tables/ContractsTable";
import ShowContractModal from "@/modules/rrhh/contrats/modals/ContractModal";
import ContractNew from "@/modules/rrhh/contrats/modals/ContractNew";
import ContractEdit from "@/modules/rrhh/contrats/modals/ContractEdit";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import useFetchContracts from "@/modules/rrhh/hooks/useFetchContracts";
import useEntityMutation from "@/hooks/useEntityMutation";


const Contracts = () => {

  const [selectedContract, setSelectedContract] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openContract, setOpenContract] = useState(false);
  const {data} = useFetchContracts();
  const contractMutation = useEntityMutation('contract');

  const deleteContract = async (contract) =>{
    try {
      console.log(`/rrhh/contract/${contract.id}`)
      contractMutation.mutate({
        action: 'delete',
        id: contract.id,
        entity: {},
        apiPath: `/rrhh/contract/${contract.id}`
      })
    } catch (error) {
      console.error("Error during delete contract", error)
    }
  }

  return (
    <>
      <div className="w-full flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">Contratos de la Organizacion</h1>
        <ContractNew/>
      </div>
      <Card>
        <CardContent>
          <ContractsTable
            contracts={data?.rows || [] }
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