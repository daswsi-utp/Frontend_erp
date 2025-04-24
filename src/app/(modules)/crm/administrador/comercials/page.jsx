'use client'
import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import useCrud1 from '@/hooks/useCrud1'

import ActiveTable from './extras/ActiveTable'
import InactiveTable from './extras/InactiveTable'

const EjecutivosComerciales = () => {
  const [activeComercial, setActiveComercial] = useState([])
  const [inactiveComercial, setInactiveComercial] = useState([])
  const { getModel: getComercials } = useCrud1('/api/v1/admin/comercials')

  const main_route = "/api/v1/admin/comercials"

  // Datos simulados
  const mockComercials = [
    {
      id: 1,
      first_name: "Ana",
      last_name: "López",
      document_number: "12345678",
      phone: "999888777",
      country: "Perú",
      country_code: "pe",
      city: "Lima",
      email: "ana@example.com",
      document_type: "dni",
      gender: "female",
      user_status: "active",
      avatar: { url: "/avatars/1.jpg" }
    },
    {
      id: 2,
      first_name: "Carlos",
      last_name: "Méndez",
      document_number: "87654321",
      phone: "999111222",
      country: "México",
      country_code: "mx",
      city: "Ciudad de México",
      email: "carlos@example.com",
      document_type: "dni",
      gender: "male",
      user_status: "inactive",
      avatar: { url: "/avatars/2.jpg" }
    }
  ]

  const loadData = async () => {
    // Simulamos la carga de datos
    const getData = await getComercials(main_route)
    
    // Usamos datos mock si no hay respuesta
    const data = getData.data?.length ? getData.data : mockComercials
    
    setActiveComercial(
      data.filter((item) => item.user_status === 'active')
        .map((item, index) => ({ 
          ...item, 
          index: index + 1, 
          full_name: `${item.first_name} ${item.last_name}` 
        }))
    )
    setInactiveComercial(
      data.filter((item) => item.user_status === 'inactive')
        .map((item, index) => ({ 
          ...item, 
          index: index + 1, 
          full_name: `${item.first_name} ${item.last_name}` 
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
          Panel de Ejecutivos Comerciales
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
              data={activeComercial}
              loadData={loadData}
              getComercials={getComercials}
              showButtonNew={true}
              mainRoute={main_route}
              title="Ejecutivo(a) de Ventas"
            />
          </TabsContent>
          
          <TabsContent value="inactive">
            <InactiveTable
              data={inactiveComercial}
              loadData={loadData}
              getComercials={getComercials}
              showButtonNew={false}
              mainRoute={main_route}
              title="Ejecutivo(a) de Ventas"
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default EjecutivosComerciales