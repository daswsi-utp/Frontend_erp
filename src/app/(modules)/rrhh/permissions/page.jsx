"use client"

import React, { useEffect, useState } from "react";
import PermisionsTable from "@/modules/rrhh/permisions/tables/PermisionsTable";
import PermisionNew from "@/modules/rrhh/permisions/modals/NewPermision";
import PermisionEdit from "@/modules/rrhh/permisions/modals/EditPermision";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import useCrud from "@/hooks/useCrud";

const Permisions = () => {

    const [selectedPermision, setSelectedPermision] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);

    const {getModel, deleteModel} = useCrud("/rrhh/permission")
    const [permisions, setPermisions] = useState([]);
    
    const fetchPermissions = async () =>{
      try {
        const data = await getModel();
        setPermisions(data);
      } catch (error) {
        console.error("Error recovery permisions");
      }
    }

    const deletePermission = async (permission) =>{
    try {
      console.log(`/rrhh/permission/${permission.id}`)
      await deleteModel(`/rrhh/permission/${permission.id}`);
      await fetchPermissions();
    } catch (error) {
      console.error("Error during delete permission", error)
    }
  }

    useEffect(() => {
      fetchPermissions();
    }, []);


    return (
      <>
        <div className="w-full flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">Registrar Permisos</h1>
          <PermisionNew
            fetchPermissions={fetchPermissions}
          />
        </div>
        <Card>
          <CardContent>
            <PermisionsTable
              permisions={permisions}
              setSelectedPermision={setSelectedPermision}
              setOpenEdit={setOpenEdit}
              deletePermission={deletePermission}
            />
            <PermisionEdit
              open={openEdit}
              onOpenChange={setOpenEdit}
              permision={selectedPermision}
            />
          </CardContent>
        </Card>
      </>
    );
};
export default Permisions;
  