'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteQuoteModal = ({ open, setOpen, onDelete, quote }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Eliminar Cotización</DialogTitle>
        </DialogHeader>
        <div className="py-4 text-center">
          <p>¿Estás seguro de que deseas eliminar esta cotización?</p>
          <p className="font-bold mt-2">
            {quote?.client?.name || 'Cliente no especificado'}
          </p>
        </div>
        <div className="pt-4 flex justify-end gap-2">
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)} 
            className="bg-gray-300 hover:bg-gray-400"
          >
            Cancelar
          </Button>
          <Button 
            onClick={() => {
              onDelete(quote?.id);
              setOpen(false);
            }} 
            className="bg-red-600 hover:bg-red-700"
          >
            Eliminar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteQuoteModal;