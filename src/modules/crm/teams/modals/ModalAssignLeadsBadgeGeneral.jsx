'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tooltip } from '@/components/ui/tooltip'
import { Spinner } from '@/components/ui/spinner'

import useCrud from '../../../../../hooks/useCrud'

const ModalAssignLeadsBadgeGeneral = ({ comercial, courses, open, onOpenChange, typeModal }) => {
  const currentUser = JSON.parse(localStorage.getItem('current_user'))
  const { getModelData: getLeads } = useCrud('')
  const { insertModelWithConfirmation: assignLeads } = useCrud('')

  const [courseSelected, setCourseSelected] = useState('')
  const [totalLeadsAssigned, setTotalLeadsAssigned] = useState(0)
  const [totalLeads, setTotalLeads] = useState(0)
  const [comercialLeads, setComercialLeads] = useState(0)
  const [countryLeads, setCountryLeads] = useState('')
  const [loadListLeads, setLoadListLeads] = useState(false)

  const handleSubmitAssignLeads = async (e) => {
    e.preventDefault()
    const leads_assign = {
      totalLeads: totalLeadsAssigned,
      course_id: courseSelected,
      user_id: comercial.id,
      country: countryLeads,
      assigner_name: `${currentUser.first_name} ${currentUser.last_name}`,
    }
    await assignLeads(leads_assign, '/api/v1/general/leads/assign_to_user_general', () =>
      onOpenChange(false)
    )
  }

  // Aquí podrías añadir lógica para cargar datos según curso/país, etc.

  if (!comercial) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            Asignar Leads de la bolsa general al comercial {comercial.first_name} {comercial.last_name}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmitAssignLeads} noValidate>
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="select-course">Curso</Label>
              <Select
                value={courseSelected}
                onValueChange={setCourseSelected}
                aria-label="select-course"
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una opción" />
                </SelectTrigger>
                <SelectContent>
                  {courses?.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="select-country">País</Label>
              <Select
                value={countryLeads}
                onValueChange={setCountryLeads}
                aria-label="select-country"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona Peruanos o Extranjeros" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Selecciona Peruanos o Extranjeros</SelectItem>
                  <SelectItem value="Perú">Peruanos</SelectItem>
                  <SelectItem value="extranjero">Extranjeros</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Aquí podrías poner un input para ingresar cantidad de leads a asignar */}
            <div>
              <Label htmlFor="leads-to-assign"># de leads a asignar</Label>
              <Input
                type="number"
                min={0}
                value={totalLeadsAssigned}
                onChange={(e) => setTotalLeadsAssigned(Number(e.target.value))}
                required
              />
            </div>
          </div>
          <DialogFooter className="mt-6 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!courseSelected || totalLeadsAssigned <= 0}>
              Asignar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ModalAssignLeadsBadgeGeneral
