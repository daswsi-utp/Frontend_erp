'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import useCrud from '@/hooks/useCrud'

import ActiveTable from '@/modules/crm/comercials/tables/ActiveTable'
import InactiveTable from '@/modules/crm/comercials/tables/InactiveTable'

const CoordinadoresVentas = () => {
  const [activeCoordinators, setActiveCoordinators] = useState([])
  const [inactiveCoordinators, setInactiveCoordinators] = useState([])
  const { getModel: getCoordinators } = useCrud()

  const loadData = async () => {
    const getData = await getCoordinators('/crm/members')
    const data = Array.isArray(getData) ? getData : getData.data;

    setActiveCoordinators(
      data.filter(item => item.status === 1 && item.crmRole === 'COORDINATOR_CRM')
        .map((item, index) => ({
          ...item,
          index: index + 1,
          full_name: `${item.fullName}`
        }))
    )

    setInactiveCoordinators(
      data.filter(item => item.status === 0 && item.crmRole === 'COORDINATOR_CRM')
        .map((item, index) => ({
          ...item,
          index: index + 1,
          full_name: `${item.fullName}`
        }))
    )
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary">
          Panel de Coordinadores de Ventas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="active" className="w-full">
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
            <ActiveTable
              data={activeCoordinators}
              loadData={loadData}
              showButtonNew={true}
              title="Coordinador(a) de Ventas"
            />
          </TabsContent>

          <TabsContent value="inactive">
            <InactiveTable
              data={inactiveCoordinators}
              loadData={loadData}
              showButtonNew={false}
              title="Coordinador(a) de Ventas"
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default CoordinadoresVentas
