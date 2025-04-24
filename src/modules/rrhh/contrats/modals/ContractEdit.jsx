"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; // usando Select de shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { FileText } from "lucide-react";


const ContractEdit=({ open, onOpenChange, contract, onContractChange })=> {
  if (!contract) return null;

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
              <DialogTitle>Editar Contrato</DialogTitle>
            </DialogHeader>
          </div>

          <div className="flex flex-col gap-4">
          {/* Bloque con dos campos en columna + icono al lado */}
          <div className="grid grid-cols-4 gap-4 items-start">
            <div className="flex flex-col gap-4 col-span-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Empleado</label>
                <Select value={contract.employee.id} onValueChange={val => handleChange('employee', val)}>
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
                <label className="text-sm font-medium">Tipo de contrato</label>
                <Select value={contract.type} onValueChange={val => handleChange('contractType', val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Indefinido">Indefinido</SelectItem>
                    <SelectItem value="Temporal">Temporal</SelectItem>
                    <SelectItem value="Practicante">Practicante</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <FileText size={180} className="text-primary" />
          </div>

          {/* Segundo bloque: campos normales en dos columnas */}
          <ScrollArea className="max-h-[60vh] pr-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Inicio de contrato</label>
                <Input
                  value={contract.startDate}
                  type="date"
                  onChange={e => handleChange("startDate", e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Fin de contrato</label>
                <Input
                  value={contract.startDate}
                  type="date"
                  onChange={e => handleChange("endDate", e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Estado</label>
                <Select value={contract.status} onValueChange={val => handleChange('state', val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVO">ACTIVO</SelectItem>
                    <SelectItem value="FINALIZADO">FINALIZADO</SelectItem>
                    <SelectItem value="RESCINDIDO">RESCINDIDO</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Archivo del Contrato</label>
                <Input
                  type="file"
                  onChange={e => handleChange('contractFile', e.target.value)}
                />
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
export default ContractEdit;