"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; // usando Select de shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { FileText, TreePalm  } from "lucide-react";
import useCrud from "@/hooks/useCrud";


const VacationEdit=({ open, onOpenChange, vacation, onVacationChange, fetchVacations })=> {
  if (!vacation) return null;

  const {getModel, updateModel} = useCrud()
  
  const [formData, setFormData] = useState({ ...vacation });
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () =>{
    try {
      const data = await getModel("/rrhh/employee");
      setEmployees(data);
    } catch (error) {
      console.error("Error during recovery employees", error);
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    if (onVacationChange) {
      onItemChange(updated);
    }
  };

  const handleSave = async () => {
    try {
      console.log("Datos actualizados:", formData);
      await updateModel(formData, "/rrhh/vacation");
      fetchVacations();
      onOpenChange(false);
    } catch (error) {
      console.error("Error during update vacation", error)
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="max-h-[60vh]">
        <DialogContent className="max-w-3xl p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <DialogHeader className="space-y-0">
              <DialogTitle>Editar Registro de Vacaciones</DialogTitle>
            </DialogHeader>
          </div>

          <div className="flex flex-col gap-4">
          {/* Bloque con dos campos en columna + icono al lado */}
          <div className="grid grid-cols-4 gap-4 items-start">
            <div className="flex flex-col gap-4 col-span-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Empleado</label>
                <Select value={formData.employee.id} onValueChange={val => handleChange('employee', { id: val })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    {(employees.map((employee)=>(
                      <SelectItem key={employee.id} value={employee.id}>{employee.firstName} {employee.lastName}</SelectItem>
                    )))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Dias tomados</label>
                <Input value={vacation.daysTaken} type="text"/>
              </div>
            </div>
            <TreePalm size={180} className="text-primary" />
          </div>

          {/* Segundo bloque: campos normales en dos columnas */}
          <ScrollArea className="max-h-[60vh] pr-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Dia de Inicio</label>
                <Input
                  value={formData.startDate}
                  type="date"
                  onChange={e => handleChange("startDate", e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Dia de Fin</label>
                <Input
                  value={formData.endDate}
                  type="date"
                  onChange={e => handleChange("endDate", e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Estado</label>
                <Select value={formData.state} onValueChange={val => handleChange('state', val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SOLICITADO">Solicitado</SelectItem>
                    <SelectItem value="APROBADO">Aprobado</SelectItem>
                    <SelectItem value="RECHAZADO">Rechazado</SelectItem>
                    <SelectItem value="EN_PROCESO">En Proceso</SelectItem>
                    <SelectItem value="FINALIZADO">Finalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Dia de Solicitud</label>
                <Input
                  value={formData.requestAt}
                  type="date"
                  onChange={e => handleChange("requestAt", e.target.value)}
                />
              </div>
            </div>
          </ScrollArea>
        </div>

          <DialogFooter className="mt-6">
            <Button variant="default" onClick={handleSave}>Guardar Cambios</Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}
export default VacationEdit;