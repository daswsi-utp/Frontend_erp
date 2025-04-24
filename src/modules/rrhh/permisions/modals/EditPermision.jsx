"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; // usando Select de shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Ambulance   } from "lucide-react";


const PermisionEdit=({ open, onOpenChange, permision, onPermisionChange })=> {
    if (!permision) return null;

  const [formData, setFormData] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Datos guardados:", formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="max-h-[60vh]">
        <DialogContent className="max-w-3xl p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <DialogHeader className="space-y-0">
              <DialogTitle>Nuevo Registro de Permiso</DialogTitle>
            </DialogHeader>
          </div>

          <div className="flex flex-col gap-4">
          {/* Bloque con dos campos en columna + icono al lado */}
          <div className="grid grid-cols-4 gap-4 items-start">
            <div className="flex flex-col gap-4 col-span-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Empleado</label>
                <Select value={permision.employee.id} onValueChange={val => handleChange('employee', val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={1}>Daniel Cabrera</SelectItem>
                    <SelectItem value={2}>Empleado 2</SelectItem>
                    <SelectItem value={3}>Empleado 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Dias tomados</label>
                <Input
                  value={permision.daysTaken}
                  type="text"
                  onChange={e => handleChange("startDate", e.target.value)}
                />
              </div>
            </div>
            <Ambulance  size={180} className="text-primary" />
          </div>

          {/* Segundo bloque: campos normales en dos columnas */}
          <ScrollArea className="max-h-[60vh] pr-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Dia de Inicio</label>
                <Input
                  value={permision.startDate}
                  type="date"
                  onChange={e => handleChange("startDate", e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Dia de Fin</label>
                <Input
                  value={permision.endDate}
                  type="date"
                  onChange={e => handleChange("endDate", e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Estado</label>
                <Select value={permision.status} onValueChange={val => handleChange('state', val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="APROVADO">APROVADO</SelectItem>
                    <SelectItem value="PENDIENTE">PENDIENTE</SelectItem>
                    <SelectItem value="DESAPROVADO">DESAPROVADO</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Dia de Solicitud</label>
                <Input
                  value={permision.requestedAt}
                  type="date"
                  onChange={e => handleChange("endDate", e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Tipo</label>
                <Select value={permision.type} onValueChange={val => handleChange('state', val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ENFERMEDAD">ENFERMEDAD</SelectItem>
                    <SelectItem value="MATERNIDAD">MATERNIDAD</SelectItem>
                    <SelectItem value="LUTO">LUTO</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </ScrollArea>
        </div>

          <DialogFooter className="mt-6">
            <Button variant="default">Guardar Cambios</Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}
export default PermisionEdit;