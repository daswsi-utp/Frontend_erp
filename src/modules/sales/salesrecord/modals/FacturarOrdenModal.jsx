'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const FacturarOrdenModal = ({ open, onOpenChange, orden }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Facturar Orden OP-{orden?.id}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>¿Deseas generar factura para {orden?.cliente}?</p>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            Confirmar Factura
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FacturarOrdenModal;