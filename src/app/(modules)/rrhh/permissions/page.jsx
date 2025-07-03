"use client"
import React, { useEffect, useState } from "react";
import PermisionsTable from "@/modules/rrhh/permisions/tables/PermisionsTable";
import PermisionNew from "@/modules/rrhh/permisions/modals/NewPermision";
import PermisionEdit from "@/modules/rrhh/permisions/modals/EditPermision";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import useEntityMutation from "@/hooks/useEntityMutation";
import useFetchPermissions from "@/modules/rrhh/hooks/useFetchPermissions";

const Permisions = () => {

    const permissionMutation = useEntityMutation('permission')
    const { data } = useFetchPermissions()
    const [selectedPermision, setSelectedPermision] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);

    const deletePermission = async (permission) =>{
    try {
      console.log(`/rrhh/permission/${permission.id}`)
      permissionMutation.mutate({
        action: 'delete',
        id: permission.id,
        entity: {},
        apiPath: `/rrhh/permission/${permission.id}`
      })
    } catch (error) {
      console.error("Error during delete permission", error)
    }
  }

    return (
      <>
        <div className="w-full flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">Registrar Permisos</h1>
          <PermisionNew/>
        </div>
        <Card>
          <CardContent>
            <PermisionsTable
              permisions={data?.rows || []}
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
  