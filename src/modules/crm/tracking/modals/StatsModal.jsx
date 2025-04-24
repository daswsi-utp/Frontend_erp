'use client'
import { useState, useEffect } from 'react'
import {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import ChartStatsUserByProduct from '@/components/charts/ChartStatsUserByProduct'

const initialStats = [
 { client_state_id: 1, client_state_name: "Nuevo Cliente", client_state_slug: "NC", calls_count: 0, color: "#6ae6dc" },
 { client_state_id: 2, client_state_name: "Cliente Interesado", client_state_slug: "CI", calls_count: 0, color: "#fa9141" },
 { client_state_id: 3, client_state_name: "Cliente Potencial", client_state_slug: "CP", calls_count: 0, color: "#fcdf56" },
 { client_state_id: 4, client_state_name: "Envio de Ficha", client_state_slug: "EF", calls_count: 0, color: "#a2ff54" },
 { client_state_id: 5, client_state_name: "Matriculado", client_state_slug: "M", calls_count: 0, color: "#82edd3" },
 { client_state_id: 6, client_state_name: "No Interesado", client_state_slug: "NI", calls_count: 0, color: "#f25c52" },
 { client_state_id: 7, client_state_name: "No Responde", client_state_slug: "NR", calls_count: 0, color: "#795382" },
 { client_state_id: 8, client_state_name: "Numero Equivocado", client_state_slug: "NE", calls_count: 0, color: "#3d3d3d" },
 { client_state_id: 11, client_state_name: "Separar Matricula", client_state_slug: "SM", calls_count: 0, color: "#5098eb" }
]

const today = new Date().toISOString().split('T')[0]

const StatsModal = ({ seller, open, onOpenChange }) => {
 const [stats, setStats] = useState(initialStats)
 const [loading, setLoading] = useState(false)
 const [totalUniqueClients, setTotalUniqueClients] = useState(0)

 const handleLoadStats = async () => {
  setLoading(true)
  try {
   // Simulación de datos - reemplazar con llamada API real
   const mockResponse = {
    calls_by_state: [
     { client_state: "NC", calls_count: 5, unique_clients: 3 },
     { client_state: "CI", calls_count: 8, unique_clients: 4 },
     { client_state: "CP", calls_count: 3, unique_clients: 2 },
     { client_state: "EF", calls_count: 2, unique_clients: 1 },
     { client_state: "M", calls_count: 6, unique_clients: 3 },
    ],
    total_unique_clients: 13
   }

   const updatedStats = initialStats.map(stat => {
    const foundState = mockResponse.calls_by_state.find(s => s.client_state === stat.client_state_slug)
    return foundState
     ? { ...stat, calls_count: foundState.calls_count }
     : stat
   })

   setStats(updatedStats)
   setTotalUniqueClients(mockResponse.total_unique_clients)
  } catch (error) {
   console.error("Error loading stats:", error)
  } finally {
   setLoading(false)
  }
 }

 useEffect(() => {
  if (open) {
   handleLoadStats()
  } else {
   setStats(initialStats)
  }
 }, [open])

 return (
  <Dialog open={open} onOpenChange={onOpenChange}>
   <DialogContent className="g:w-[85vw] lg:max-w-[85vw] lg:h-[80vh] lg:max-h-[80vh]">
    <div className="flex flex-col h-full">
     <DialogHeader className="sticky top-0 z-10 bg-background p-6 border-b">
      <DialogTitle className="text-2xl">Estadísticas de: {seller?.full_name}</DialogTitle>

      <div className="flex items-center gap-4 mt-4">
       <div className="flex-1">
        <Input
         type="date"
         value={today}
         disabled
         className="w-full"
        />
       </div>
       <Button onClick={handleLoadStats} disabled={loading}>
        <Search className="mr-2 h-4 w-4" />
        {loading ? 'Cargando...' : 'Actualizar'}
       </Button>
      </div>
     </DialogHeader>

     {/* Contenido con scroll */}
     <div className="flex-1 overflow-auto p-6">
      <ChartStatsUserByProduct
       stats={stats.filter(s => s.calls_count > 0)}
       totalUniqueClients={totalUniqueClients}
      />
     </div>
    </div>
   </DialogContent>
  </Dialog>
 )
}

export default StatsModal