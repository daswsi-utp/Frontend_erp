'use client';
import { useState } from 'react';
import QuotesTable from "@/modules/sales/quotes/tables/QuotesTable";
import { Button } from '@/components/ui/button';
import NewQuoteModal from '@/modules/sales/quotes/modals/NewQuoteModal';
import EditQuoteModal from '@/modules/sales/quotes/modals/EditQuoteModal';
import DeleteQuoteModal from '@/modules/sales/quotes/modals/DeleteQuoteModal';
import ViewQuoteModal  from '@/modules/sales/quotes/modals/ViewQuoteModal';

const SalesPage = () => { 
  const initialQuotes = [
    
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

  // Estados consolidados
  const [quotes, setQuotes] = useState(initialQuotes);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  
  // Estados para modales
  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false); // Añadido para vista previa
  const [openDelete, setOpenDelete] = useState(false);
  
  
  // Estado para carga
  const [isDeleting, setIsDeleting] = useState(false);

  // Función para manejar edición
  const handleEdit = (quote) => {
    setSelectedQuote(quote);
    setOpenEdit(true);
  };

  // Función para manejar eliminación
  const handleDelete = async (quoteId) => {
    setIsDeleting(true);
    try {
      // Simulación de llamada API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setQuotes(quotes.filter(q => q.id !== quoteId));
      setOpenDelete(false);
    } catch (error) {
      console.error("Error al eliminar:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Cotizaciones - Módulo de Ventas</h1>
        <Button onClick={() => setOpenNew(true)} className="bg-green-600 hover:bg-green-700">
          + Nueva Cotización
        </Button>
      </div>

      <QuotesTable 
        quotes={quotes}
        setSelectedQuote={setSelectedQuote}
        setSelectedFile={setSelectedFile}
        setOpenEdit={setOpenEdit}
        setOpenDelete={setOpenDelete}
        setOpenView={setOpenView}
      />

      <NewQuoteModal 
        open={openNew}
        onClose={() => setOpenNew(false)}
        onSave={(newQuote) => {
          setQuotes([...quotes, newQuote]);
          setOpenNew(false);
        }}
      />

      <EditQuoteModal 
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        quote={selectedQuote}
        onSave={(updatedQuote) => {
          setQuotes(quotes.map(q => q.id === updatedQuote.id ? updatedQuote : q));
          setOpenEdit(false);
        }}
      />

      <DeleteQuoteModal
        open={openDelete}
        setOpen={setOpenDelete}
        onDelete={handleDelete}
        quote={selectedQuote}
        isDeleting={isDeleting}
      />

  

    </div>
  );
};

export default SalesPage;