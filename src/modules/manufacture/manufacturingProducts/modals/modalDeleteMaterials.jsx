"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteMaterialsModal=({ open, onOpenChange, materials })=>{
  if (!materials) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar Eliminación</DialogTitle>
        </DialogHeader>

        <p>¿Seguro que quieres eliminar <strong>{materials.name}</strong>?</p>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button variant="destructive">Eliminar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default DeleteMaterialsModal;