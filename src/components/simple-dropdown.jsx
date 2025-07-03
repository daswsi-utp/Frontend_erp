"use client";

import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useCrud from "@/hooks/useCrud"
import useEntityMutation from "@/hooks/useEntityMutation";


export function SimpleDropDown({ plan, onDelete, onUpdate }) {

  const planningMutation = useEntityMutation('plan')
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [date, setDate] = useState();
  const [name, setName] = useState(plan?.plan_name || "");
  const [description, setDescription] = useState(plan?.plan_description || "");
  const formatDate = (dateStr) => dateStr?.split("T")[0] || "";

  const [startDate, setStartDate] = useState(formatDate(plan?.plan_start_date));
  const [endDate, setEndDate] = useState(formatDate(plan?.plan_end_date));


  const { updateModel } = useCrud("/planning/plan");

const handleUpdate = async (e) => {
  e.preventDefault();

  const updatedPlan = {
    plan_name: name,
    plan_description: description,
    plan_start_date: startDate,
    plan_end_date: endDate,
  };

  onUpdate?.(plan.plan_id, updatedPlan);
  setIsEditDialogOpen(false);
};

  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setIsEditDialogOpen(true)}>
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setIsDeleteAlertOpen(true)}>
            Borrar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Registro</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleUpdate}>
            <div>
              <label className="block text-sm font-medium mb-1">Nombre Plan</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Descripcion</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Fecha Inicio</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Fecha Fin</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="mt-2">
              Guardar
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará el Plan permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setIsDeleteAlertOpen(false);
                onDelete?.(plan.plan_id);
              }}
            >
              Borrar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}