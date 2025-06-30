'use client';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import SellersTable from '@/modules/crm/tracking/tables/SellersTable';
import useCrud from '@/hooks/useCrud';


const PageTracking = () => {
  const { getModel: getMembers } = useCrud()
  const [sellers, setSellers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMembers(`/crm/members/role/ASESOR_CRM`);
      setSellers(data);
    } catch (err) {
      setError('Error al cargar los datos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []); 

  if (loading) return <p>Cargando asesores...</p>;
  if (error) return <p>{error}</p>;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Seguimiento de Asesores</CardTitle>
      </CardHeader>
      <CardContent>
        <SellersTable
          data={sellers}
          typeSeller="Asesores Comerciales"
          color="green"
        />
      </CardContent>
    </Card>
  );
}

export default PageTracking;