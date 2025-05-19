'use client'

import React, { useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { FaArrowsDownToPeople } from "react-icons/fa6";
import { FaAtlassian } from "react-icons/fa";
import { FaCrown } from "react-icons/fa";
import useCrud from '@/hooks/useCrud'
import ModalAssignLeads from '@/modules/crm/teams/modals/ModalAssignLeads'
import ModalAssignLeadsBadgeGeneral from '@/modules/crm/teams/modals/ModalAssignLeadsBadgeGeneral'

const MyTeam = () => {
  const { getModelData: getMyTeam, getModelData: getCourses } = useCrud('')

  const [showModal, setShowModal] = useState(false)
  const [typeModal, setTypeModal] = useState('')
  const [currentUser, setCurrentUser] = useState(null)

  const [currentTeam, setCurrentTeam] = useState([])
  const [listCourses, setListCourses] = useState([])

  const handleShowModal = (type, member) => {
    setTypeModal(type)
    setCurrentUser(member)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const loadData = async () => {
    try {
      const { comercials } = await getMyTeam('/api/v2/general/comercials')
      const filteredData = comercials.filter((item) => ![48, 2, 1].includes(item.id))
      const sortedData = filteredData.sort((a, b) => b.role_id - a.role_id)
      setCurrentTeam(sortedData)

      const { courses } = await getCourses('/api/v2/general/courses/active')
      setListCourses(courses)
    } catch (error) {
      console.error('Error al cargar los datos:', error)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Equipo de Ventas, listado completo</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Nombres Completos</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentTeam.length > 0 ? (
              currentTeam.map((member, index) => (
                <TableRow key={member.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{member.first_name} {member.last_name}</TableCell>
                  <TableCell>
                    {member.role_id === 5 ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge variant="outline" className="cursor-default">
                            Coordinador <FaCrown className="ml-1" />
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>Coordinador de Ventas</TooltipContent>
                      </Tooltip>
                    ) : (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge variant="outline" className="cursor-default">
                            Comercial
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>Agente Comercial</TooltipContent>
                      </Tooltip>
                    )}
                  </TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="mr-2"
                          onClick={() => handleShowModal('new_leads', member)}
                        >
                          <FaArrowsDownToPeople />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Asignar nuevos leads</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleShowModal('new_leads_general', member)}
                        >
                          <FaAtlassian/>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Asignar nuevos leads general</TooltipContent>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No hay registros
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      <ModalAssignLeads
        showModal={showModal && typeModal === 'new_leads'}
        onOpenChange={handleCloseModal}
        comercial={currentUser}
        listCourses={listCourses}
        typeModal={typeModal}
        open={showModal && typeModal === 'new_leads'}
      />
      <ModalAssignLeadsBadgeGeneral
        showModal={showModal && typeModal === 'new_leads_general'}
        onOpenChange={handleCloseModal}
        comercial={currentUser}
        courses={listCourses}
        typeModal={typeModal}
        open={showModal && typeModal === 'new_leads_general'}
      />
    </Card>
  )
}

export default MyTeam
