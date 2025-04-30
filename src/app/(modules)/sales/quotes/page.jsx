'use client';
import { useState } from 'react';
import QuotesTable from "@/modules/sales/quotes/tables/QuotesTable";
import { Button } from '@/components/ui/button';

const SalesPage = () => {
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const exampleQuotes = [
    {
      id: 1,
      client: { name: 'Constructora Alfa' },
      salesRep: 'María López',
      serviceType: 'Diseño Arquitectónico',
      amount: 50000,
      status: 'pendiente',
      expiration: '2025-05-20',
      date: '2025-04-15',
      file: '/files/quote1.pdf'
    },
    {
      id: 2,
      client: { name: 'Inmobiliaria Beta' },
      salesRep: 'Carlos Ruiz',
      serviceType: 'Supervisión de Obra',
      amount: 75000,
      status: 'aceptada',
      expiration: '2025-05-10',
      date: '2025-04-10',
      file: '/files/quote2.pdf'
    },
    {
      id: 3,
      client: { name: 'Grupo Delta' },
      salesRep: 'Laura Gómez',
      serviceType: 'Consultoría Técnica',
      amount: 32000,
      status: 'rechazada',
      expiration: '2025-04-25',
      date: '2025-04-01',
      file: '/files/quote3.pdf'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Cotizaciones - Módulo de Ventas</h1>
      
      <QuotesTable 
        quotes={exampleQuotes}
        setSelectedQuote={setSelectedQuote}
        setSelectedFile={setSelectedFile}
        setOpenEdit={setOpenEdit}
        setOpenDelete={setOpenDelete}
        setOpenView={() => {}} // Puedes implementar si quieres abrir modal
      />

      {selectedFile && (
        <div className="border rounded-lg p-4 bg-gray-50 mt-4">
          <h2 className="text-lg font-semibold mb-2">Vista Previa de Cotización</h2>
          <iframe 
            src={selectedFile}
            className="w-full h-[500px] border rounded"
            title="Vista previa de archivo"
          />
          <Button onClick={() => setSelectedFile(null)} className="mt-4">
            Cerrar vista previa
          </Button>
        </div>
      )}
    </div>
  );
};

export default SalesPage;
