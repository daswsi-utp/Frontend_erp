"use client";

import { useState } from "react";
import OrdenesProduccionTable from "@/modules/manufacture/manufacturingControl/tables/ordenesPTables";
import NewOrdenProduccionModal from "@/modules/manufacture/manufacturingControl/modals/modalNewOrdenProduccion";
import EditOrdenProduccionModal from "@/modules/manufacture/manufacturingControl/modals/modalEditOrdenProduccion";
import DeleteOrdenProduccionModal from "@/modules/manufacture/manufacturingControl/modals/modalDeleteOrdenProduccion";

const ordenesProduccion = [
  {
    id: 1,
    codigoOrden: "OP-001",
    fechaInicio: "2025-04-01",
    fechaFin: "2025-04-05",
    producto: "Detergente Líquido",
    cantidad: 431,
    estado: "Finalizada",
    responsable: "Elvis Soto",
  },
  {
    id: 2,
    codigoOrden: "OP-002",
    fechaInicio: "2025-04-10",
    fechaFin: "2025-04-15",
    producto: "Shampoo Herbal",
    cantidad: 250,
    estado: "En proceso",
    responsable: "Sonia Aguilar",
  },
  {
    id: 3,
    codigoOrden: "OP-003",
    fechaInicio: "2025-04-12",
    fechaFin: "2025-04-18",
    producto: "Jabón Neutro",
    cantidad: 130,
    estado: "Cancelada",
    responsable: "Luis Torres",
  },
];

const OrdenesProduccion = () => {
  const [selectedOrden, setSelectedOrden] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <>
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">
          Órdenes de Producción
        </h1>
        <NewOrdenProduccionModal />
      </div>

      <OrdenesProduccionTable
        data={ordenesProduccion}
        setSelectedOrden={setSelectedOrden}
        setOpenEdit={setOpenEdit}
        setOpenDelete={setOpenDelete}
      />

      <EditOrdenProduccionModal
        open={openEdit}
        onOpenChange={setOpenEdit}
        //orden={selectedOrden}
        item={selectedOrden}
        //onOrdenChange={setSelectedOrden}// se usaria para datos externo depende del modal al usar handleSave()
      />

      <DeleteOrdenProduccionModal
        open={openDelete}
        onOpenChange={setOpenDelete}
        orden={selectedOrden}
      />
    </>
  );
};

export default OrdenesProduccion;
