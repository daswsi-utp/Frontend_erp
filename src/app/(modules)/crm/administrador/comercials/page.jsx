'use client'
import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import useCrud from '@/hooks/useCrud'

import ActiveTable from '@/modules/crm/comercials/tables/ActiveTable'
import InactiveTable from '@/modules/crm/comercials/tables/InactiveTable'

const EjecutivosComerciales = () => {
  const [activeComercial, setActiveComercial] = useState([])
  const [inactiveComercial, setInactiveComercial] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { getModel: getComercials } = useCrud()


  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const getData = await getComercials('/crm/members');
      console.log('getData:', getData);
  
      const data = Array.isArray(getData) ? getData : getData.data;
  
      if (!Array.isArray(data)) {
        throw new Error('Los datos recibidos no son un array');
      }
  
      setActiveComercial(
        data.filter(item => item.status === 1 && item.crmRole === 'ASESOR_CRM')
          .map((item, index) => ({
            ...item,
            index: index + 1,
            full_name: item.fullName
          }))
      );
      setInactiveComercial(
        data.filter(item => item.status === 0 && item.crmRole === 'ASESOR_CRM')
          .map((item, index) => ({
            ...item,
            index: index + 1,
            full_name: item.fullName
          }))
      );
    } catch (err) {
      setError('Error al cargar comerciales: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  

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
              title="Ejecutivo(a) de Ventas"
            />
          </TabsContent>

          <TabsContent value="inactive">
            <InactiveTable
              data={inactiveComercial}
              loadData={loadData}
              getComercials={getComercials}
              showButtonNew={false}
              title="Ejecutivo(a) de Ventas"
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default EjecutivosComerciales