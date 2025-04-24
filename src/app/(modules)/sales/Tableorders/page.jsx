"use client";

import Tableorders from "@/modules/sales/Tables/Tableorders";

const HistorialOrdenesPage = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Seguimiento de Órdenes</h1>
      <Tableorders />
    </div>
  );
};

export default HistorialOrdenesPage;
