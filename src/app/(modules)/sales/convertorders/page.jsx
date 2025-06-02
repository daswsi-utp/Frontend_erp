'use client'
import { useState } from "react";
import SalesTable from "@/modules/sales/salesrecord/tables/SalesTable";
import VerOrdenModal from "@/modules/sales/salesrecord/modals/VerOrdenModal";
import FacturarOrdenModal from "@/modules/sales/salesrecord/modals/FacturarOrdenModal";
import NuevaOrdenModal from "@/modules/sales/salesrecord/modals/NuevaOrdenModal";

const ordenes = [
  {
    id: 1,
    cliente: "Constructora Alfa",
    fecha: "2024-05-15",
    estado: "Finalizada",
    producto: "Ventanas de aluminio",
    cantidad: 50,
    responsable: "Juan Pérez"
  },
  {
    id: 2,
    cliente: "Mueblería Beta",
    fecha: "2024-05-18",
    estado: "En proceso",
    producto: "Puertas de madera",
    cantidad: 20,
    responsable: "María Gómez"
  },
  {
    id: 3,
    cliente: "Decoraciones Gamma",
    fecha: "2024-05-20",
    estado: "Cancelada",
    producto: "Estantes metálicos",
    cantidad: 100,
    responsable: "Carlos Ruiz"
  },
  {
    id: 4,
    cliente: "Inmobiliaria Delta",
    fecha: "2024-05-22",
    estado: "En proceso",
    producto: "Escaleras de acero",
    cantidad: 15,
    responsable: "Ana López"
  }
]

const OrdenesProduccionPage = () => {
  const [selectedOrden, setSelectedOrden] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [openFacturar, setOpenFacturar] = useState(false);

  return (
    <>
      <div className="w-full flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">
          Órdenes de Producción
        </h1>
        <NuevaOrdenModal />
      </div>
      
      <SalesTable
        data={ordenes}
        setSelectedOrden={setSelectedOrden}
        setOpenView={setOpenView}
        setOpenFacturar={setOpenFacturar}
      />
      
      <VerOrdenModal
        open={openView}
        onOpenChange={setOpenView}
        orden={selectedOrden}
      />
      
      <FacturarOrdenModal
        open={openFacturar}
        onOpenChange={setOpenFacturar}
        orden={selectedOrden}
      />
    </>
  );
};

export default OrdenesProduccionPage;