'use client';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Trash2, FileEdit, Download } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from '@/components/ui/input';
import { Package, ShoppingBag, Tag } from 'lucide-react';

const formatDate = (dateStr) => {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateStr));
};

const QuotesTable = ({ 
  quotes = [],
  setSelectedQuote, 
  setSelectedFile, 
  setOpenEdit, 
  deleteQuote, 
  setOpenView,
  onShowProducts
}) => {
  const [searchTerm, setSearchTerm] = useState('');
   const [openProductModal, setOpenProductModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

   const columns = [
    { key: 'id', label: 'ID', className: 'w-20' },
    { key: 'issueDate', label: 'Fecha Creación', className: 'w-40' },
    { key: 'expirationDate', label: 'Fecha Expiración', className: 'w-40' },
    { key: 'state', label: 'Estado', className: 'w-32' },
    { key: 'totalAmount', label: 'Monto Total', className: 'w-32' },
    { key: 'paymentMethod', label: 'Método Pago', className: 'w-32' },
    { key: 'observation', label: 'Observaciones', className: 'w-32' },
    { key: 'options', label: 'Opciones', className: 'w-40' }
  ];;

  const statusColorVariants = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    APPROVED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
    EXPIRED: 'bg-gray-100 text-gray-800'
  };

 const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount || 0);
  };


  const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return '-';
    const date = new Date(dateTimeStr);
    return date.toLocaleString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

   const filteredQuotes = quotes.filter(quote => {
    return quote.id.toString().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="relative w-full max-w-[100vw] overflow-hidden space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Buscar por ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
      </div>

      <ScrollArea className="w-full">
        <div className="min-w-max w-full">
          <Table>
            <TableHeader className="bg-gray-200 dark:bg-gray-900">
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.key} className={column.className}>
                    {column.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuotes.length > 0 ? (
                filteredQuotes.map((quote) => (
                  <TableRow key={quote.id}>
                    <TableCell className="font-medium">COT-{quote.id.toString().padStart(4, '0')}</TableCell>
                    <TableCell>{formatDateTime(quote.issueDate)}</TableCell>
                    <TableCell>{formatDateTime(quote.expirationDate)}</TableCell>
                    <TableCell>
                      <Badge className={`${statusColorVariants[quote.state] || 'bg-gray-100 text-gray-800'} text-xs capitalize`}>
                        {quote.state.toLowerCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatCurrency(quote.totalAmount)}</TableCell>
                    <TableCell>{quote.paymentMethod}</TableCell>
                    <TableCell>{quote.observation}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => {
                            setSelectedQuote(quote);
                            setOpenView(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedQuote(quote);
                            setOpenEdit(true);
                          }}
                        >
                          <FileEdit className="h-4 w-4" />
                        </Button>
                        <Button
                         variant="outline" 
                         size="sm"
                         onClick={() => onShowProducts(quote)}                   
                        >
                          <Package className="h-4 w-4" />  {/* Icono de caja/paquete */}                       
                          </Button>
                        
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => {
                            deleteQuote(quote);
                            
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-4">
                    {quotes.length === 0 ? 'No hay cotizaciones disponibles' : 'No se encontraron resultados'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  );
};

export default QuotesTable;