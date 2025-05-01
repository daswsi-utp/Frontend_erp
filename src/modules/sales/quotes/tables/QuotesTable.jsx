'use client';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Trash2, FileEdit, Download } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from '@/components/ui/input';

const formatDate = (dateStr) => {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateStr));
};

const QuotesTable = ({ 
  quotes = [], // Valor por defecto para evitar undefined
  setSelectedQuote, 
  setSelectedFile, 
  setOpenEdit, 
  setOpenDelete, 
  setOpenView 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    { key: 'id', label: 'ID', className: 'w-20' },
    { key: 'client', label: 'Cliente' },
    { key: 'salesRep', label: 'Vendedor' },
    { key: 'amount', label: 'Monto', className: 'w-32' },
    { key: 'status', label: 'Estado', className: 'w-32' },
    { key: 'date', label: 'Creación', className: 'w-32' },
    { key: 'expiration', label: 'Vencimiento', className: 'w-32' },
    { key: 'options', label: 'Opciones', className: 'w-40' }
  ];

  const statusColorVariants = {
    pendiente: 'bg-yellow-100 text-yellow-800',
    aceptada: 'bg-green-100 text-green-800',
    rechazada: 'bg-red-100 text-red-800',
    vencida: 'bg-gray-100 text-gray-800'
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount || 0);
  };

  const filteredQuotes = quotes.filter((quote) => {
    const clientName = quote.client?.name || '';
    return clientName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="relative w-full max-w-[100vw] overflow-hidden space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Buscar por cliente..."
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
                    <TableCell>{quote.client?.name || 'Cliente no especificado'}</TableCell>
                    <TableCell>{quote.salesRep || '-'}</TableCell>
                    <TableCell>{formatCurrency(quote.amount)}</TableCell>
                    <TableCell>
                      <Badge className={`${statusColorVariants[quote.status] || 'bg-gray-100 text-gray-800'} text-xs capitalize`}>
                        {quote.status || 'pendiente'}
                      </Badge>
                    </TableCell>
                    <TableCell>{quote.date ? formatDate(quote.date) : '-'}</TableCell>
                    <TableCell>{quote.expiration ? formatDate(quote.expiration) : '-'}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => {
                            setSelectedQuote(quote);
                            setSelectedFile(quote.file);
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
                          onClick={() => {
                            console.log('Descargar cotización:', quote.id);
                          }}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => {
                            setSelectedQuote(quote);
                            setOpenDelete(true);
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
                  <TableCell colSpan={8} className="text-center py-4">
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