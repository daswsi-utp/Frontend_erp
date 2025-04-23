// src/app/(tu-ruta)/AprobacionCotizacionesPage.tsx
"use client";

import ComparacionPrecios from "@/modules/sales/register/pricecomparison";
import Comentarios from "@/modules/sales/register/commentregister";
import FirmaAprobacion from "@/modules/sales/register/approvalsignatureregister";
import { Button } from "@/components/ui/button";

const AprobacionCotizacionesPage = () => {
  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Aprobación de Cotizaciones</h1>
      <ComparacionPrecios />
      <Comentarios />
      <FirmaAprobacion />
      <Button className="w-full">Enviar</Button>
    </div>
  );
};

export default AprobacionCotizacionesPage;
