import React from 'react'

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

const EditAttendanceModal = ({open, onOpenChange, employee, onEmployeeChange}) => {
    if (!employee) return null;

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [justifiedDescription, setJustifiedDescription] = useState("");

  return (
    <div className="relative h-full max-h-screen overflow-hidden">
      <Dialog open={open} onOpenChange={onOpenChange} className="max-h-[60vh]">
        <DialogContent className="max-w-3xl p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <DialogHeader className="space-y-0">
              <DialogTitle>Editar Asistencia de {employee.fistName} {employee.lastName}</DialogTitle>
            </DialogHeader>
          </div>

            {/* Fecha */}
            <div className="flex flex-col mb-4">
                <label className="text-sm font-medium mb-1">Fecha</label>
                <Select onValueChange={setSelectedDate}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione una fecha" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="23-04-2025">23-04-2025</SelectItem>
                    <SelectItem value="24-04-2025">24-04-2025</SelectItem>
                    <SelectItem value="25-04-2025">25-04-2025</SelectItem>
                </SelectContent>
                </Select>
            </div>

            {/* Estado (solo si hay fecha) */}
            {selectedDate && (
                <div className="flex flex-col mb-4">
                <label className="text-sm font-medium mb-1">Estado</label>
                <Select onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="Asistio">Asistió</SelectItem>
                    <SelectItem value="Falto">Faltó</SelectItem>
                    <SelectItem value="Justificado">Justificado</SelectItem>
                    </SelectContent>
                </Select>
                </div>
            )}

            {/* Descripción si es Justificado */}
            {selectedStatus === "Justificado" && (
                <div className="flex flex-col mb-4">
                <label className="text-sm font-medium mb-1">Descripción</label>
                <Input
                    placeholder="Describa el motivo de la justificación"
                    value={justifiedDescription}
                    onChange={(e) => setJustifiedDescription(e.target.value)}
                />
                </div>
            )}


          <DialogFooter className="mt-6">
            <Button variant="default">Guardar Cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EditAttendanceModal
