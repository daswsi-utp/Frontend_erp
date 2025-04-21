"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useState } from "react";
import { UserCircle } from "lucide-react";

const EditEmployeeModal = ({ open, onOpenChange, employee, onEmployeeChange  }) =>{
  if (!employee) return null;

  const [formData, setFormData] = useState({ ...employee });

  const handleChange = (field, value) => {
    if (onEmployeeChange) {
      onEmployeeChange({ ...employee, [field]: value });
    }
  };

  return (
    <div className="relative h-full max-h-screen overflow-hidden">
      <Dialog open={open} onOpenChange={onOpenChange} className="max-h-[60vh]">
        <DialogContent className="max-w-3xl p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <DialogHeader className="space-y-0">
              <DialogTitle>Editar Empleado</DialogTitle>
            </DialogHeader>
          </div>

          <ScrollArea className="h-[70vh] pr-2">
            <div className="grid grid-cols-2 gap-4">
              {/* Primer par */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Nombre</label>
                <Input value={employee.firstName} onChange={e => handleChange('firstName', e.target.value)} className="mb-1" />
                <label className="text-sm font-medium mb-1">Apellido</label>
                <Input value={employee.lastName} onChange={e => handleChange('lastName', e.target.value)} className="mb-1" />
              </div>
              <div className="flex flex-col items-center justify-center ">
                <UserCircle size={128} />
              </div>

              {/* Luego el resto en pares */}
              {[
                { label: "Tipo de Documento", field: "documentType" },
                { label: "Número de Documento", field: "documentNumber" },
                { label: "Correo Electrónico", field: "email" },
                { label: "Teléfono", field: "phoneNumber" },
                { label: "Dirección", field: "address" },
                { label: "Fecha de Nacimiento", field: "birthDate", type: "date" },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col">
                  <label className="text-sm font-medium mb-1">{item.label}</label>
                  <Input
                    type={item.type || "text"}
                    value={employee[item.field]}
                    onChange={e => handleChange(item.field, e.target.value)}
                  />
                </div>
              ))}

              {/* Género */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Género</label>
                <Select value={employee.gender} onValueChange={val => handleChange('gender', val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Masculino</SelectItem>
                    <SelectItem value="FEMALE">Femenino</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Código de Departamento */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Código de Departamento</label>
                <Select value={employee.department.name} onValueChange={val => handleChange('department.name', val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Recursos Humanos">Recursos Humanos</SelectItem>
                    <SelectItem value="Client Relation Managment">Client Relation Managment</SelectItem>
                    <SelectItem value="Inventario">Inventario</SelectItem>
                    <SelectItem value="Finanzas">Finanzas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Cargo */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Cargo</label>
                <Select value={employee.position.name} onValueChange={val => handleChange('position.name', val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Gerente de Area">Gerente de Area</SelectItem>
                    <SelectItem value="Ejecutivo de Inventario">Ejecutivo de Inventario</SelectItem>
                    <SelectItem value="Contadora">Contadora</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Fecha de Contratación */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Fecha de Contratación</label>
                <Input type="date" value={employee.hireDate} onChange={e => handleChange('hireDate', e.target.value)} />
              </div>

              {/* Tipo de Contrato */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Tipo de Contrato</label>
                <Select value={employee.contractType} onValueChange={val => handleChange('contractType', val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Indefinido">Indefinido</SelectItem>
                    <SelectItem value="Temporal">Temporal</SelectItem>
                    <SelectItem value="Practicante">Practicante</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Código de Empleado */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Código de Empleado</label>
                <Input value={employee.employeeCode} onChange={e => handleChange('employeeCode', e.target.value)} />
              </div>

              {/* Estado */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Estado</label>
                <Select value={employee.state} onValueChange={val => handleChange('state', val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Activo">Activo</SelectItem>
                    <SelectItem value="Inactivo">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Contacto de Emergencia */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Contacto de Emergencia - Nombre</label>
                <Input value={employee.emergencyContact.name} onChange={e => handleChange('emergencyContactName', e.target.value)} />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Contacto de Emergencia - Teléfono</label>
                <Input value={employee.emergencyContact.phone} onChange={e => handleChange('emergencyContactPhone', e.target.value)} />
              </div>
            </div>
          </ScrollArea>

          <DialogFooter className="mt-6">
            <Button variant="default">Guardar Cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default EditEmployeeModal;