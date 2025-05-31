"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteEmployeeModal=({ open, onOpenChange, employee })=>{
  if (!employee) return null;

  const handleDelete = () =>{
    console.log(`Empleado y usuario con id: ${employee.id} eliminado`);
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar Eliminación</DialogTitle>
        </DialogHeader>

        <p>¿Seguro que quieres eliminar <strong>{employee.firstName} {employee.lastName}</strong>?</p>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button variant="destructive" onClick={handleDelete}>Eliminar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default DeleteEmployeeModal;