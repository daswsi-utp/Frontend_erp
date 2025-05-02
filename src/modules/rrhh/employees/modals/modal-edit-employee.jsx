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

  const [formData, setFormData] = useState(employee ?? {});

  if (employee && employee.id !== formData.id) {
    setFormData({ ...employee });
  }

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    if (onEmployeeChange) {
      onEmployeeChange(updated);
    }
  };

  const handleSave = () => {
    console.log("Datos editados guardados:", formData);
    onOpenChange(false);
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
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Nombre</label>
                <Input
                  value={formData.firstName}
                  onChange={e => handleChange('firstName', e.target.value)} 
                  className="mb-1" />
                <label className="text-sm font-medium mb-1">Apellido</label>
                <Input 
                  value={formData.lastName}
                  onChange={e => handleChange('lastName', e.target.value)}
                  className="mb-1" />
              </div>
              <div className="flex flex-col items-center justify-center ">
                <UserCircle size={128} />
              </div>

              {[
                { label: "Codigo de empleado", field: "employeeCode", value:formData.employeeCode },
                { label: "DNI", field: "dni", value:formData.dni },
                { label: "Correo Electrónico", field: "email", value:formData.email },
                { label: "Teléfono", field: "phoneNumber", value:formData.phoneNumber },
                { label: "Dirección", field: "address", value:formData.address },
                { label: "Fecha de Nacimiento", field: "birthDate", type: "date", value:formData.birthDate },
                { label: "Contacto de emergencia - Nombre", field: "emergencyContactName", value:formData.emergencyContactName },
                { label: "Contacto de emergencia - Número", field: "emergencyContactPhone", value:formData.emergencyContactPhone },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col">
                  <label className="text-sm font-medium mb-1">{item.label}</label>
                  <Input
                    value={item.value}
                    type={item.type || "text"}
                    onChange={e => handleChange(item.field, e.target.value)}
                  />
                </div>
              ))}

              {/* Género */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Género</label>
                <Select defaultValue={formData.gender} onValueChange={val => handleChange('gender', val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Masculino</SelectItem>
                    <SelectItem value="FEMALE">Femenino</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Departamento */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Departamento</label>
                <Select defaultValue={formData.department.id} onValueChange={val => handleChange('department', { id: val })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={1}>Recursos Humanos</SelectItem>
                    <SelectItem value={2}>Client Relation Managment</SelectItem>
                    <SelectItem value={3}>Inventario</SelectItem>
                    <SelectItem value={4}>Finanzas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Cargo */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Cargo</label>
                <Select defaultValue={formData.position.id} onValueChange={val => handleChange('position', { id: val })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={1}>Gerente de Area</SelectItem>
                    <SelectItem value={2}>Ejecutivo de Inventario</SelectItem>
                    <SelectItem value={3}>Contadora</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Estado */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Estado</label>
                <Select defaultValue={formData.state} onValueChange={val => handleChange('state', val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Activo">Activo</SelectItem>
                    <SelectItem value="Desactivado">Desactivado</SelectItem>
                    <SelectItem value="Vacaciones">Vacaciones</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </ScrollArea>

          <DialogFooter className="mt-6">
            <Button variant="default" onClick={handleSave}>Guardar Cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default EditEmployeeModal;