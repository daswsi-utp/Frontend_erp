"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; // usando Select de shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { FileText } from "lucide-react";
import useCrud from "@/hooks/useCrud";
import { DialogClose } from "@radix-ui/react-dialog";
import useEntityMutation from "@/hooks/useEntityMutation";
import useFetchEmployees from "@/modules/rrhh/hooks/useFetchEmployee";
import {isNonEmpty, isValidDate} from "@/utils/validators";
import { useToast } from '@/components/ui/use-toast'
import { AlertCircle } from 'lucide-react'

const ContractNew=({ fetchContracts })=> {

  const contractMutation = useEntityMutation('contract');
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

    if (!formData.employee?.id) {errors.push("Debe seleccionar un empleado.");}
    if (!isNonEmpty(formData.type)) {errors.push("Debe seleccionar el tipo de contrato.");}
    if (!isValidDate(formData.startDate)) {errors.push("Debe ingresar una fecha de inicio válida.");}
    if (!isValidDate(formData.endDate)) {errors.push("Debe ingresar una fecha de fin válida.");}
    if (!isNonEmpty(formData.state)) {errors.push("Debe seleccionar un estado.");}
    if (!formData.contractFile) {errors.push("Debe adjuntar un archivo de contrato.");}
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
      const file = formData.contractFile;
      const contractData = {
        employee: formData.employee,
        type: formData.type,
        startDate: formData.startDate,
        endDate: formData.endDate,
        state: formData.state
      };
      contractMutation.mutate({
        action: 'create_multipart',
        entity: {
          data: { ...contractData },
          file: file
        },
        apiPath: '/rrhh/contract'
      })
    } catch (error) {
      console.error("Error al guardar contrato:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Nuevo Contrato</Button>
      </DialogTrigger>
        <DialogContent className="max-w-3xl p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <DialogHeader className="space-y-0">
              <DialogTitle>Nuevo Contrato</DialogTitle>
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
                <label className="text-sm font-medium">Tipo de contrato</label>
                <Select onValueChange={val => handleChange('type', val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DETERMINADO">DETERMINADO</SelectItem>
                    <SelectItem value="SERVICIO">SERVICIO</SelectItem>
                    <SelectItem value="TEMPORAL">TEMPORAL</SelectItem>
                    <SelectItem value="PASANTIA">PASANTIA</SelectItem>
                    <SelectItem value="HONORARIOS">HONORARIOS</SelectItem>
                    <SelectItem value="SUPLENCIA">SUPLENCIA</SelectItem>
                    <SelectItem value="PARTTIME">PARTTIME</SelectItem>
                    <SelectItem value="APRENDIZAJE">APRENDIZAJE</SelectItem>
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
                  type="date"
                  onChange={e => handleChange("startDate", e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Fin de contrato</label>
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
                    <SelectItem value="VIGENTE">Vigente</SelectItem>
                    <SelectItem value="SUSPENDIDO">Suspendido</SelectItem>
                    <SelectItem value="RENOVADO">Renovado</SelectItem>
                    <SelectItem value="VENCIDO">Vencido</SelectItem>
                    <SelectItem value="RESCINDIDO">Rescindido</SelectItem>
                    <SelectItem value="FINALIZADO">Finalizado</SelectItem>
                    <SelectItem value="ARCHIVADO">Archivado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Archivo del Contrato</label>
                <Input
                  type="file"
                  onChange={e => handleChange('contractFile', e.target.files[0])}
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
export default ContractNew;