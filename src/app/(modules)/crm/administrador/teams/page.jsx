'use client'

import React, { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tooltip } from '@/components/ui/tooltip'
import { faArrowsDownToPeople, faAtlassian, faCrown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import useCrud from '../../../../hooks/useCrud'
import ModalAssignLeads from '@/modules/crm/teams/modals/ModalAssignLeads'
import ModalAssignLeadsBadgeGeneral from '@/modules/crm/teams/modals/ModalAssignLeadsBadgeGeneral'

const CoordinadoresVentas = () => {
  const { getModelData: getMyTeam, getModelData: getCourses } = useCrud('')

  const [activeKey, setActiveKey] = useState('active')
  const [currentTeam, setCurrentTeam] = useState([])
  const [listCourses, setListCourses] = useState([])

  const [showModal, setShowModal] = useState(false)
  const [typeModal, setTypeModal] = useState('')
  const [currentUser, setCurrentUser] = useState(null)

  const handleShowModal = (type, member) => {
    setTypeModal(type)
    setCurrentUser(member)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setCurrentUser(null)
    setTypeModal('')
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

  // Separa los coordinadores activos e inactivos
  const activeCoordinators = currentTeam.filter(c => c.user_status === 'active')
  const inactiveCoordinators = currentTeam.filter(c => c.user_status === 'inactive')

  const renderTable = (data) => (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b">
          <th className="text-left p-2">#</th>
          <th className="text-left p-2">Nombres Completos</th>
          <th className="text-left p-2">Cargo</th>
          <th className="text-left p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.length ? data.map((member, index) => (
          <tr key={member.id} className="border-b hover:bg-muted">
            <td className="p-2">{index + 1}</td>
            <td className="p-2">{member.first_name} {member.last_name}</td>
            <td className="p-2">
              {member.role_id === 5 ? (
                <Tooltip content="Coordinador de Ventas">
                  <Badge variant="outline" className="cursor-default">
                    Coordinador <FontAwesomeIcon icon={faCrown} className="ml-1" />
                  </Badge>
                </Tooltip>
              ) : (
                <Tooltip content="Agente Comercial">
                  <Badge variant="outline" className="cursor-default">
                    Comercial
                  </Badge>
                </Tooltip>
              )}
            </td>
            <td className="p-2 space-x-2">
              <Tooltip content="Asignar nuevos leads">
                <Button size="sm" variant="outline" onClick={() => handleShowModal('new_leads', member)}>
                  <FontAwesomeIcon icon={faArrowsDownToPeople} />
                </Button>
              </Tooltip>
              <Tooltip content="Asignar nuevos leads general">
                <Button size="sm" variant="outline" onClick={() => handleShowModal('new_leads_general', member)}>
                  <FontAwesomeIcon icon={faAtlassian} />
                </Button>
              </Tooltip>
            </td>
          </tr>
        )) : (
          <tr>
            <td colSpan={4} className="p-4 text-center">No hay registros</td>
          </tr>
        )}
      </tbody>
    </table>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary">
          Panel de Coordinadores de Ventas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeKey} onValueChange={setActiveKey} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">
              <Badge variant="outline" className="text-green-600 border-green-600">
                Activos
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="inactive">
              <Badge variant="outline" className="text-red-600 border-red-600">
                Inactivos
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            {renderTable(activeCoordinators)}
          </TabsContent>

          <TabsContent value="inactive">
            {renderTable(inactiveCoordinators)}
          </TabsContent>
        </Tabs>
      </CardContent>

      <ModalAssignLeads
        open={showModal && typeModal === 'new_leads'}
        onOpenChange={setShowModal}
        typeModal={typeModal}
        comercial={currentUser}
        listCourses={listCourses}
      />
      <ModalAssignLeadsBadgeGeneral
        open={showModal && typeModal === 'new_leads_general'}
        onOpenChange={setShowModal}
        typeModal={typeModal}
        comercial={currentUser}
        courses={listCourses}
      />
    </Card>
  )
}

export default CoordinadoresVentas
