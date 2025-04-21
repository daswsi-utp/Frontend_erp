'use client';
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SellersTable from '@/modules/crm/tracking/tables/SellersTable';

const mockAsesores = [
  {
    id: 1,
    index: 1,
    full_name: 'Juan Pérez',
    phone: '999888777',
    country: 'Perú',
    created_at: '2023-11-01',
    team: 'Equipo Norte',
    leads: 15,
    conversions: 5
  },
  {
    id: 2,
    index: 2,
    full_name: 'María Gómez',
    phone: '999888666',
    country: 'Chile',
    created_at: '2023-11-05',
    team: 'Equipo Sur',
    leads: 12,
    conversions: 7
  },
  {
    id: 3,
    index: 3,
    full_name: 'Carlos Rojas',
    phone: '999888555',
    country: 'Colombia',
    created_at: '2023-11-10',
    team: 'Equipo Este',
    leads: 8,
    conversions: 3
  }
];

const PageTracking = () => {
  const [asesores, setAsesores] = useState(mockAsesores);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Seguimiento de Asesores</CardTitle>
      </CardHeader>
      <CardContent>
        <SellersTable
          data={asesores}
          typeSeller="Asesores Comerciales"
          color="green"
        />
      </CardContent>

      
    </Card>
  );
}

export default PageTracking;