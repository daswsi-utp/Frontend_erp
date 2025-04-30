'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const ViewQuoteModal = ({ 
  open, 
  setOpen, 
  quote,
  file 
}) => {
  const formatDate = (dateStr) => {
    return format(new Date(dateStr), 'dd/MM/yyyy', { locale: es });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount);
  };

  const statusMap = {
    pendiente: 'bg-yellow-100 text-yellow-800',
    aceptada: 'bg-green-100 text-green-800',
    rechazada: 'bg-red-100 text-red-800',
    vencida: 'bg-gray-100 text-gray-800'
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Vista Previa de Cotización</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">ID</h3>
            <p>{quote?.id}</p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Estado</h3>
            <Badge className={`${statusMap[quote?.status]} capitalize`}>
              {quote?.status}
            </Badge>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Cliente</h3>
            <p>{quote?.client?.name}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Vendedor</h3>
            <p>{quote?.salesRep}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Servicio</h3>
            <p>{quote?.serviceType}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Monto</h3>
            <p>{formatCurrency(quote?.amount)}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Creación</h3>
            <p>{formatDate(quote?.date)}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Vencimiento</h3>
            <p>{formatDate(quote?.expiration)}</p>
          </div>
        </div>

        {file && (
          <div className="flex justify-end gap-2 pt-4">
            <Button asChild variant="outline">
              <a href={file} target="_blank" rel="noopener noreferrer">
                Ver documento completo
              </a>
            </Button>
            <Button asChild>
              <a href={file} download={`Cotización_${quote?.id}.pdf`}>
                Descargar PDF
              </a>
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};