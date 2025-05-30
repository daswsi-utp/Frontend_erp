"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; // usando Select de shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Ambulance   } from "lucide-react";
import useCrud from "@/hooks/useCrud";


const PermisionEdit=({ open, onOpenChange, permision, onPermisionChange, fetchPermissions })=> {
  if (!permision) return null;

  const {getModel, updateModel} = useCrud()
  
  const [formData, setFormData] = useState({ ...permision });
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
    if (onPermisionChange) {
      onPermisionChange(updated);
    }
  };

  const handleSave = async () => {
    try {
      console.log("Datos actualizados:", formData);
      await updateModel(formData, "/rrhh/permission");
      fetchPermissions();
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
              <DialogTitle>Nuevo Registro de Permiso</DialogTitle>
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
                <label className="text-sm font-medium">Tipo</label>
                <Select value={formData.type} onValueChange={val => handleChange('type', val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PERMISO_ENFERMEDAD">ENFERMEDAD</SelectItem>
                    <SelectItem value="PERMISO_PERSONAL">PERSONAL</SelectItem>
                    <SelectItem value="PERMISO_LICENCIA">LICENCIA</SelectItem>
                    <SelectItem value="PERMISO_EXAMEN">EXAMEN</SelectItem>
                    <SelectItem value="PERMISO_VIAJE">VIAJE</SelectItem>
                    <SelectItem value="PERMISO_FAMILIAR">FAMILIAR</SelectItem>
                    <SelectItem value="PERMISO_COMPENSATORIO">COMPENSATORIO</SelectItem>
                    <SelectItem value="PERMISO_JUDICIAL">JUDICIAL</SelectItem>
                    <SelectItem value="PERMISO_CELEBRACION">CELEBRACION</SelectItem>
                    <SelectItem value="PERMISO_OTRO">OTRO</SelectItem>
                  </SelectContent>
                </Select>
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
            <Button onClick={handleSave} variant="default">Guardar Cambios</Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}
export default PermisionEdit;