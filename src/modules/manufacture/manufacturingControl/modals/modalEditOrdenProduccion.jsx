"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const EditOrdenProduccionModal = ({ open, onOpenChange, item }) => {
  if (!item) return null;

  const [formData, setFormData] = useState({ ...item });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Orden de Producción editada:", formData);
    // Aquí podrías llamar a tu backend para guardar la edición
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Orden de Producción</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm">Producto</label>
            <Input
              defaultValue={item.nombreProducto}
              onChange={(e) => handleChange("nombreProducto", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Cantidad</label>
            <Input
              type="number"
              defaultValue={item.cantidad}
              onChange={(e) => handleChange("cantidad", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Fecha de Inicio</label>
            <Input
              type="date"
              defaultValue={item.fechaInicio}
              onChange={(e) => handleChange("fechaInicio", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Fecha de Fin</label>
            <Input
              type="date"
              defaultValue={item.fechaFin}
              onChange={(e) => handleChange("fechaFin", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Responsable</label>
            <Input
              defaultValue={item.responsable}
              onChange={(e) => handleChange("responsable", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Estado</label>
            <Select
              defaultValue={item.estado}
              onValueChange={(value) => handleChange("estado", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pendiente">Pendiente</SelectItem>
                <SelectItem value="En Proceso">En Proceso</SelectItem>
                <SelectItem value="Finalizada">Finalizada</SelectItem>
                <SelectItem value="Cancelada">Cancelada</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSave} variant="default">
            Guardar cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditOrdenProduccionModal;