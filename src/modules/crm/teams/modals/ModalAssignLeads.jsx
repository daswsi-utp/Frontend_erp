'use client'

import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tooltip } from '@/components/ui/tooltip'

import useCrud from '@/hooks/useCrud'

const ModalAssignLeads = ({ comercial, listCourses, open, onOpenChange, typeModal }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'))
  const { getModelData: getCourses } = useCrud('')
  const { insertModelWithConfirmation: assignLeads } = useCrud('')

  const [courses, setCourses] = useState([])
  const [totalsByCourse, setTotalsByCourse] = useState({})
  const [totalLeadsAssigned, setTotalLeadsAssigned] = useState({})
  const [loadListLeads, setLoadListLeads] = useState(false)

  useEffect(() => {
    if (comercial && comercial.id) {
      loadCourse(comercial.id)
    }
  }, [comercial])

  const loadCourse = async (userId) => {
    try {
      const { courses, totals_by_course } = await getCourses(`/api/v2/general/courses?user_id=${userId}`)
      setCourses(courses)
      setTotalsByCourse(totals_by_course)
    } catch (error) {
      console.error('Error al cargar los datos:', error)
    }
  }

  const onChangeCalculateLeads = (e, courseId) => {
    const value = Math.min(e.target.value, totalsByCourse[courseId]?.total_clients_nc || 0)
    setTotalLeadsAssigned((prev) => ({ ...prev, [courseId]: value }))
  }

  const handleSubmitAssignLeads = async (e) => {
    e.preventDefault()

    const leads_assign = Object.entries(totalLeadsAssigned).map(([courseId, totalLeads]) => ({
      course_id: courseId,
      totalLeads: totalLeads,
      user_id: comercial.id,
      assigner_name: `${currentUser.first_name} ${currentUser.last_name}`,
    }))

    await assignLeads(leads_assign, '/api/v1/general/leads/assign_to_user', () => onOpenChange(false))
    setTotalLeadsAssigned({})
  }

  if (!comercial) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            Asignar Leads al comercial {comercial.first_name} {comercial.last_name}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmitAssignLeads} noValidate>
          <div className="space-y-6 mt-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Curso</th>
                  <th className="text-left p-2">Total</th>
                  <th className="text-left p-2">Sin Asignar NC</th>
                  <th className="text-left p-2">Asignar Client</th>
                </tr>
              </thead>
              <tbody>
                {courses &&
                  courses.map(([courseId, courseName]) => (
                    <tr key={courseId} className="border-b hover:bg-muted">
                      <td className="p-2">{courseName}</td>
                      <td className="p-2">{totalsByCourse[courseId]?.total_clients}</td>
                      <td className="p-2">{totalsByCourse[courseId]?.total_clients_nc}</td>
                      <td className="p-2">
                        <Input
                          type="number"
                          min={0}
                          max={totalsByCourse[courseId]?.total_clients_nc}
                          value={totalLeadsAssigned[courseId] || 0}
                          onChange={(e) => onChangeCalculateLeads(e, courseId)}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <DialogFooter className="mt-6 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={Object.keys(totalLeadsAssigned).length === 0}>
              Asignar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ModalAssignLeads
