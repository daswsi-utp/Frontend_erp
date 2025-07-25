"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; // usando Select de shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Ambulance   } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import useEntityMutation from "@/hooks/useEntityMutation";
import useFetchEmployees from "@/modules/rrhh/hooks/useFetchEmployee";
import {isValidDate} from "@/utils/validators";
import { useToast } from '@/components/ui/use-toast'
import { AlertCircle } from 'lucide-react'

const PermisionNew=({ })=> {

  const permissionMutation = useEntityMutation('permission')
  const { data: employees } = useFetchEmployees()
  const [formData, setFormData] = useState({});
  const { toast } = useToast()

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const errors = [];

    if (!isValidDate(formData.requestAt)) errors.push("Fecha de solicitud inválida.");
    if (!isValidDate(formData.startDate)) errors.push("Fecha de inicio inválida.");
    if (!isValidDate(formData.endDate)) errors.push("Fecha de fin inválida.");
    if (!formData.state) errors.push("Debe seleccionar un estado.");
    if (!formData.type) errors.push("Debe seleccionar un tipo de permiso.");
    if (!formData.employee?.id) errors.push("Debe seleccionar un empleado.");

    return errors;
  };

  const handleSave = async () => {
    const errors = validateForm();
    if (errors.length > 0) {
      toast({
        title: "Error de validación",
        description: (
          <ul className="list-disc pl-4">
            {errors.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        ),
        variant: "destructive",
        icon: <AlertCircle className="text-red-500" />,
      })
      return;
    }
    try {
      console.log("Datos guardados:", formData);
      permissionMutation.mutate({
        action: 'create',
        entity: formData,
        apiPath: '/rrhh/permission'
      })
    } catch (error) {
      console.error("Error during insert new vacation", error)
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Nuevo Permiso</Button>
      </DialogTrigger>
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
                <Select onValueChange={val => handleChange('employee', { id: val })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    {(employees?.rows.map((employee)=>(
                      <SelectItem key={employee.id} value={employee.id}>{employee.firstName} {employee.lastName}</SelectItem>
                    )))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Tipo</label>
                <Select onValueChange={val => handleChange('type', val)}>
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
                  type="date"
                  onChange={e => handleChange("startDate", e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Dia de Fin</label>
                <Input
                  type="date"
                  onChange={e => handleChange("endDate", e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Estado</label>
                <Select onValueChange={val => handleChange('state', val)}>
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
                  type="date"
                  onChange={e => handleChange("requestAt", e.target.value)}
                />
              </div>
            </div>
          </ScrollArea>
        </div>

          <DialogFooter className="mt-6">
            <DialogClose className="rounded-lg border bg-gray-100 text-black px-3 py-1 font-bold" onClick={handleSave}>
                Guardar Cambios
            </DialogClose> 
          </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}
export default PermisionNew;