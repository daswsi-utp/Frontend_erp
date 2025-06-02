'use client';
import { useState, useEffect} from 'react';
import QuotesTable from "@/modules/sales/quotes/tables/QuotesTable";
import { Button } from '@/components/ui/button';
import NewQuoteModal from '@/modules/sales/quotes/modals/NewQuoteModal';
import EditQuoteModal from '@/modules/sales/quotes/modals/EditQuoteModal';
import DeleteQuoteModal from '@/modules/sales/quotes/modals/DeleteQuoteModal';
import ViewQuoteModal  from '@/modules/sales/quotes/modals/ViewQuoteModal';
import DetailQuoteModal from '@/modules/sales/quotes/modals/DetailQuoteModal';
import useCrud from '@/hooks/useCrud';
import ProductDetailsModal from '@/modules/sales/quotes/modals/DetailQuoteModal';


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
  const [openProducts, setOpenProducts] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]); 
  const {getModel, deleteModel} = useCrud() 
  //DESDE LA BASE DE DATOS

  const deleteQuote = async (quote) => {
      try {
        await deleteModel (`/api/v1/sales/quotes/${quote.id}`);
        await fetchQuotes ();
      } catch (error) {
        console.error(error)       
      }
  }
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
      details: quote.details || []
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

const handleShowProducts = (quote) => {
  // Verificación de seguridad
  if (!quote) {
    console.error('Error: La cotización recibida es null/undefined');
    alert('Error al cargar los productos de la cotización');
    return;
  }

  // Guarda la cotización COMPLETA en el estado
  setSelectedQuote({
    id: quote.id, // Asegura que al menos el ID está presente
    ...quote      // Copia todas las propiedades existentes
  });
  
  // Guarda los productos de la cotización
  setSelectedProducts(quote.details || []);
  
  // Abre el modal
  setOpenProducts(true);
};
const handleDeleteProduct = async (productId) => {
  try {
    const response = await fetch(`http://localhost:8091/api/v1/sales/detailquote/${productId}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error("Error al eliminar producto");
    
    // Actualiza el estado local sin recargar toda la página
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));

    setQuotes(prevQuotes => prevQuotes.map(quote => {
      if (quote.id === selectedQuote?.id) {
        return {
          ...quote,
          details: quote.details?.filter(p => p.id !== productId)
        };
      }
      return quote;
    }));

    alert("Producto eliminado correctamente");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

//AGREGAR PRODUCTOS
const handleAddProducts = async (newProducts) => {
  try {
    // Para cada producto nuevo, hacemos un POST a tu API
    const creationPromises = newProducts.map(product => {
      const requestBody = {
        quoteId: { id: selectedQuote.id },
        productId: product.productId,
        amount: product.amount,
        prize: product.prize,
        discount: product.discount,
        tax: product.tax
      };

      return fetch('http://localhost:8091/api/v1/sales/detailquote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });
    });

    const responses = await Promise.all(creationPromises);
    const allSuccessful = responses.every(res => res.ok);

    if (!allSuccessful) {
      throw new Error('Error al agregar algunos productos');
    }

    const createdProducts = await Promise.all(
      responses.map(res => res.json())
    );

    // Actualiza ambos estados
    setSelectedProducts(prev => [...prev, ...createdProducts]);
    setQuotes(prevQuotes => prevQuotes.map(quote => {
      if (quote.id === selectedQuote?.id) {
        return {
          ...quote,
          details: [...quote.details, ...createdProducts]
        };
      }
      return quote;
    }));

    alert('Productos agregados correctamente');
  } catch (error) {
    console.error('Error al agregar productos:', error);
    alert(`Error: ${error.message}`);
  }
};
/////////
const handleEditQuote = async (updatedQuote) => {
  try {
    const response = await fetch(`http://localhost:8091/api/v1/sales/quotes/${updatedQuote.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedQuote)
    });

    if (!response.ok) {
      throw new Error('Error al actualizar cotización');
    }

    const data = await response.json();
    setQuotes(quotes.map(q => q.id === data.id ? data : q));
    setOpenEdit(false);
    alert('Cotización actualizada correctamente');
  } catch (error) {
    console.error('Error:', error);
    alert(error.message);
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
        deleteQuote={deleteQuote}
        setOpenView={setOpenView}
        onShowProducts={handleShowProducts}
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
      onSave={handleEditQuote} // Usa la nueva función
/>

      <DeleteQuoteModal
        open={openDelete}
        setOpen={setOpenDelete}
        onDelete={handleDelete}
        quote={selectedQuote}
        isDeleting={isDeleting}
      />

      <ProductDetailsModal
        open={openProducts}
        onClose={() => setOpenProducts(false)}
        products={selectedProducts}
        onDeleteProduct={handleDeleteProduct} // ¡Nueva prop!
        quoteId={selectedQuote?.id}
        onAddProduct={handleAddProducts}
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