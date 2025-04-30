'use client'
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";

const NuevaOrdenModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <PlusCircle className="mr-2 h-4 w-4" />
          Nueva Orden
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Crear Nueva Orden de Producción</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {/* Formulario para nueva orden */}
          <p className="text-gray-500">Formulario de nueva orden aquí...</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NuevaOrdenModal;