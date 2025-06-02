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
  const { getModel, insertModel, deleteModel, updateModel } = useCrud();
  const { getModel: getProduct, insertModel: insertProduct, deleteModel: deleteProduct } = useCrud();
  //DESDE LA BASE DE DATOS

  const deleteQuote = async (quote) => {
      try {
        await deleteModel (`/sales/quotes/${quote.id}`);
        await fetchQuotes ();
      } catch (error) {
        console.error(error)       
      }
  }

  const formatQuote = (quote) => ({
    id: quote.id,
    issueDate: quote.issueDate,
    expirationDate: quote.expirationDate,
    state: quote.state,
    totalAmount: quote.totalAmount,
    paymentMethod: quote.typePayment, 
    observation: quote.observation,
    details: quote.details || []
  });

 
 ///////////////CARGAR CUOTAS//////////////
  const fetchQuotes = async () => {
    setIsLoading(true);
    try {
      const data = await getModel("/sales/quotes");
      setQuotes(data.map(formatQuote));
    } catch (error) {
      console.error("Error al cargar cotizaciones:", error);
      alert("Error al cargar cotizaciones");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);
////////////////////////////////////////////////

 const handleCreateQuote = async (newQuoteData) => {
    try {
      const createdQuote = await insertModel(newQuoteData, "/sales/quotes");
      setQuotes([...quotes, formatQuote(createdQuote)]);
      setOpenNew(false);
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
    await deleteProduct(`/sales/detailquote/${productId}`);
    
    // Actualizar estado local sin recargar toda la página
    setSelectedProducts(prevProducts => 
      prevProducts.filter(p => p.id !== productId)
    );

    // Actualizar también la lista de cotizaciones
    setQuotes(prevQuotes => 
      prevQuotes.map(quote => {
        if (quote.id === selectedQuote?.id) {
          return {
            ...quote,
            details: quote.details?.filter(p => p.id !== productId)
          };
        }
        return quote;
      })
    );

    alert("Producto eliminado correctamente");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

//AGREGAR PRODUCTOS
const handleAddProducts = async (newProducts) => {
  try {
    // Validación inicial
    if (!selectedQuote?.id) {
      throw new Error('No se ha seleccionado una cotización válida');
    }
    if (!newProducts || newProducts.length === 0) {
      throw new Error('No hay productos para agregar');
    }

    // Usamos insertModel del hook useCrud
    const creationPromises = newProducts.map(product => 
      insertModel( {
        quoteId: { id: selectedQuote.id },
        productId: product.productId,
        amount: product.amount,
        prize: product.prize,
        discount: product.discount,
        tax: product.tax
      } ,'/sales/detailquote',)
    );
    
    const createdProducts = await Promise.all(creationPromises);
    
    // Actualizar estados
    setSelectedProducts(prev => [...prev, ...createdProducts]);
    
    setQuotes(prevQuotes => 
      prevQuotes.map(quote => 
        quote.id === selectedQuote.id 
          ? { ...quote, details: [...(quote.details || []), ...createdProducts] }
          : quote
      )
    );

    alert('Productos agregados correctamente');
    return true;
  } catch (error) {
  console.error('Error al agregar productos:', error);

  const errorMessage =
    error.message || // viene del Error lanzado manualmente
    'Error desconocido al agregar productos';

  alert(`Error: ${errorMessage}`);
  return false;
}

};
/////////

//EDITAR CUOTA//////////////////
 const handleEditQuote = async (updatedQuote) => {
    try {
      const data = await updateModel(updatedQuote, `/sales/quotes/${updatedQuote.id}`);
      setQuotes(quotes.map(q => q.id === data.id ? formatQuote(data) : q));
      setOpenEdit(false);
      alert('Cotización actualizada correctamente');
    } catch (error) {
      console.error('Error al actualizar cotización:', error);
      alert(error.message);
    }
  };
///////////////
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
        onDelete={deleteQuote}
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