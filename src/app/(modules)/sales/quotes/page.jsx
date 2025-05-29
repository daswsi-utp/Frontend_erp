'use client';
import { useState, useEffect} from 'react';
import QuotesTable from "@/modules/sales/quotes/tables/QuotesTable";
import { Button } from '@/components/ui/button';
import NewQuoteModal from '@/modules/sales/quotes/modals/NewQuoteModal';
import EditQuoteModal from '@/modules/sales/quotes/modals/EditQuoteModal';
import DeleteQuoteModal from '@/modules/sales/quotes/modals/DeleteQuoteModal';
import ViewQuoteModal  from '@/modules/sales/quotes/modals/ViewQuoteModal';

const SalesPage = () => { 
 

   const [quotes, setQuotes] = useState([]);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Estado para carga


  //DESDE LA BASE DE DATOS

  const fetchQuotes = async () => {
    try {
      const response = await fetch('http://localhost:8091/api/v1/sales/quotes');
      if (!response.ok) {
        throw new Error('Error al obtener cotizaciones');
      }
      const data = await response.json();

      const formattedQuotes = data.map(quote => ({
      id: quote.id,
      issueDate: quote.issueDate,
      expirationDate: quote.expirationDate,
      state: quote.state,
      totalAmount: quote.totalAmount,
      paymentMethod: quote.typePayment, 
      observation: quote.observation,
      // Agrega más campos si necesitas mostrar otros datos
    }));


      setQuotes(formattedQuotes);
    } catch (error) {
      console.error("Error:", error);
      alert("Error al cargar cotizaciones");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

   const handleDelete = async (quoteId) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`http://localhost:8091/api/v1/sales/quotes/${quoteId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error al eliminar cotización');
      }
      
      await fetchQuotes(); // Recarga las cotizaciones
      setOpenDelete(false);
    } catch (error) {
      console.error("Error al eliminar:", error);
    } finally {
      setIsDeleting(false);
    }
  };

 const handleCreateQuote = async (newQuoteData) => {
  try {
    console.log('Enviando datos:', newQuoteData); // Para depuración
    
    const response = await fetch('http://localhost:8091/api/v1/sales/quotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(newQuoteData)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Error HTTP: ${response.status}`);
    }

    const createdQuote = await response.json();
    setQuotes([...quotes, createdQuote]);
    await fetchQuotes();
    setOpenNew(false);


    
    // Mostrar mensaje de éxito
    alert('Cotización creada exitosamente');
  } catch (error) {
    console.error("Error al crear cotización:", error);
    alert(`Error al crear cotización: ${error.message}`);
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

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Cargando cotizaciones...</p>
        </div>
      ) : (

      <QuotesTable 
        quotes={quotes}
        setSelectedQuote={setSelectedQuote}
        setSelectedFile={setSelectedFile}
        setOpenEdit={setOpenEdit}
        setOpenDelete={setOpenDelete}
        setOpenView={setOpenView}
      />
      )}

      <NewQuoteModal 
        open={openNew}
        onClose={() => setOpenNew(false)}
       onSave={handleCreateQuote} // Pasa la función modificada
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

      <ViewQuoteModal
        open={openView}
        onClose={() => setOpenView(false)}
        quote={selectedQuote}
        file={selectedFile}
      />


    </div>
  );
};

export default SalesPage;