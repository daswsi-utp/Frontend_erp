"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteOrdenProduccionModal = ({ open, onOpenChange, orden }) => {
  if (!orden) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar Eliminación</DialogTitle>
        </DialogHeader>

        <p>
          ¿Estás seguro que deseas eliminar la orden de producción con código{" "}
          <strong>{orden.code}</strong> y producto{" "}
          <strong>{orden.product}</strong>?
        </p>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={() => {
            console.log("Eliminar orden:", orden);
            // Aquí puedes integrar tu lógica de eliminación
            onOpenChange(false);
          }}>
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteOrdenProduccionModal;
