'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const ViewQuoteDetailsModal = ({ open, onOpenChange, quoteDetails }) => {
  const formatDate = (dateStr) => {
    return format(new Date(dateStr), 'dd/MM/yyyy', { locale: es });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Detalles de Productos</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Información general de la cotización */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground">Cotización #</h3>
              <p>{quoteDetails?.id || 'N/A'}</p>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground">Fecha</h3>
              <p>{quoteDetails?.issueDate ? formatDate(quoteDetails.issueDate) : 'N/A'}</p>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground">Estado</h3>
              <Badge variant="outline" className="capitalize">
                {quoteDetails?.state?.toLowerCase() || 'N/A'}
              </Badge>
            </div>
          </div>

          {/* Tabla de productos */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead className="text-right">Cantidad</TableHead>
                  <TableHead className="text-right">Precio Unitario</TableHead>
                  <TableHead className="text-right">Descuento</TableHead>
                  <TableHead className="text-right">Subtotal</TableHead>
                  <TableHead className="text-right">Impuesto</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quoteDetails?.details?.map((item) => {
                  const subtotal = (item.prize * item.amount) - item.discount;
                  const taxValue = item.total - subtotal;

                  return (
                    <TableRow key={item.id}>
                      <TableCell>Producto #{item.productId}</TableCell>
                      <TableCell className="text-right">{item.amount}</TableCell>
                      <TableCell className="text-right">{formatCurrency(item.prize)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(item.discount)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(subtotal)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(taxValue)} ({item.tax}%)</TableCell>
                      <TableCell className="text-right font-medium">{formatCurrency(item.total)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Totales */}
          <div className="flex justify-end">
            <div className="grid grid-cols-2 gap-8 w-1/3">
              <div className="space-y-2">
                <p className="text-sm font-medium">Subtotal:</p>
                <p className="text-sm font-medium">Impuesto:</p>
                <p className="text-lg font-bold">Total:</p>
              </div>
              <div className="space-y-2 text-right">
                <p className="text-sm">
                  {formatCurrency(
                    quoteDetails?.details?.reduce((sum, item) => sum + ((item.prize * item.amount) - item.discount), 0) || 0
                  )}
                </p>
                <p className="text-sm">
                  {formatCurrency(
                    quoteDetails?.details?.reduce((sum, item) => sum + (item.total - ((item.prize * item.amount) - item.discount)), 0) || 0
                  )}
                </p>
                <p className="text-lg font-bold">
                  {formatCurrency(
                    quoteDetails?.details?.reduce((sum, item) => sum + item.total, 0) || 0
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewQuoteDetailsModal;
