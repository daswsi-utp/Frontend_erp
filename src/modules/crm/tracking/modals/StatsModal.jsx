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
import ChartStatsUserByCourse from '@/components/charts/ChartStatsUserByCourse'

const initialStats = [
 { client_state_id: 1, client_state_name: "Nuevo Cliente", client_state_slug: "NC", count: 0, color: "#6ae6dc" },
 { client_state_id: 2, client_state_name: "Cliente Interesado", client_state_slug: "CI", count: 0, color: "#fa9141" },
 { client_state_id: 3, client_state_name: "Cliente Potencial", client_state_slug: "CP", count: 0, color: "#fcdf56" },
 { client_state_id: 4, client_state_name: "Envio de Ficha", client_state_slug: "EF", count: 0, color: "#a2ff54" },
 { client_state_id: 5, client_state_name: "Matriculado", client_state_slug: "M", count: 0, color: "#82edd3" },
 { client_state_id: 6, client_state_name: "No Interesado", client_state_slug: "NI", count: 0, color: "#f25c52" },
 { client_state_id: 7, client_state_name: "No Responde", client_state_slug: "NR", count: 0, color: "#795382" },
 { client_state_id: 8, client_state_name: "Numero Equivocado", client_state_slug: "NE", count: 0, color: "#3d3d3d" },
 { client_state_id: 11, client_state_name: "Separar Matricula", client_state_slug: "SM", count: 0, color: "#5098eb" }
]

const today = new Date().toISOString().split('T')[0]

const StatsModal = ({ seller, open, onOpenChange }) => {
 const [stats, setStats] = useState(initialStats)
 const [loading, setLoading] = useState(false)
 const [showChart, setShowChart] = useState(false)
 const [totalUniqueClients, setTotalUniqueClients] = useState(0)

 const handleLoadStats = async () => {
  setLoading(true)
  try {
   // Aquí deberías hacer la llamada a tu API real
   // Simulamos una respuesta
   const mockResponse = {
    calls_by_state: [
     { client_state: "NC", calls_count: 5, unique_clients: 3 },
     { client_state: "CI", calls_count: 8, unique_clients: 4 },
     { client_state: "CP", calls_count: 3, unique_clients: 2 },
    ],
    total_unique_clients: 9
   }

   let updatedStats = [...initialStats]

   mockResponse.calls_by_state.forEach(state => {
    const stateIndex = updatedStats.findIndex(s => s.client_state_slug === state.client_state)
    if (stateIndex !== -1) {
     updatedStats[stateIndex].count = state.calls_count
    }
   })

   setStats(updatedStats)
   setTotalUniqueClients(mockResponse.total_unique_clients)
   setShowChart(true)
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
   setShowChart(false)
  }
 }, [open])

 return (
  <Dialog open={open} onOpenChange={onOpenChange}>
   <DialogContent className="sm:max-w-2xl">
    <DialogHeader>
     <DialogTitle>Estadísticas de: {seller?.full_name}</DialogTitle>
    </DialogHeader>

    <div className="grid gap-4 py-4">
     <div className="flex items-center gap-4">
      <div className="w-full">
       <Input
        type="date"
        value={today}
        disabled
        className="w-full"
       />
      </div>
      <Button onClick={handleLoadStats} disabled={loading}>
       <Search className="mr-2 h-4 w-4" />
       {loading ? 'Cargando...' : 'Buscar'}
      </Button>
     </div>

     {showChart && (
      <ChartStatsUserByCourse
       stats={stats}
       initialStats={initialStats}
       totalUniqueClients={totalUniqueClients}
      />
     )}
    </div>
   </DialogContent>
  </Dialog>
 )
};
export default StatsModal