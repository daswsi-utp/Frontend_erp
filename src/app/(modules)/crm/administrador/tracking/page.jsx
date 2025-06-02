'use client';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import SellersTable from '@/modules/crm/tracking/tables/SellersTable';
import useCrud from '@/hooks/useCrud';


const PageTracking = () => {
  const { getModel } = useCrud();
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const data = await getModel(`/crm/members/role/asesor_crm`); 
        setSellers(data); 
        console.log("Sellers data:", data);
      } catch (error) {
        console.error("Error fetching sellers:", error);
      }
    };

    fetchSellers()
  }, [getModel])
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