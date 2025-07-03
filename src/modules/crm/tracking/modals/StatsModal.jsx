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
import useCrud from '@/hooks/useCrud'


const initialStats = [
  { clientStateId: 1, clientState: "Nuevo Cliente", clientStateSlug: "NC", callsCount: 0, color: "#6ae6dc" },
  { clientStateId: 2, clientState: "Cliente Interesado", clientStateSlug: "CI", callsCount: 0, color: "#fa9141" },
  { clientStateId: 3, clientState: "Cliente Potencial", clientStateSlug: "CP", callsCount: 0, color: "#fcdf56" },
  { clientStateId: 4, clientState: "Envio de Ficha", clientStateSlug: "EF", callsCount: 0, color: "#a2ff54" },
  { clientStateId: 5, clientState: "Matriculado", clientStateSlug: "M", callsCount: 0, color: "#82edd3" },
  { clientStateId: 6, clientState: "No Interesado", clientStateSlug: "NI", callsCount: 0, color: "#f25c52" }
]

const today = new Date().toISOString().split('T')[0]

const StatsModal = ({ seller, open, onOpenChange }) => {
  const [stats, setStats] = useState(initialStats)
  const [loading, setLoading] = useState(false)
  const [totalUniqueClients, setTotalUniqueClients] = useState(0)

  const { getModel: getSellers } = useCrud()

  const handleLoadStats = async () => {
    setLoading(true);
    try {
      const id = seller.id || seller.user_id;
      const response = await getSellers(`/crm/sellers/${id}/stats`);
      
      if (response && Array.isArray(response)) {
        const data = response;

        const totalClients = data.reduce((acc, curr) => acc + curr.uniqueClients, 0);

        setStats(data); 
        setTotalUniqueClients(totalClients);
      } else {
        setStats([]); 
      }
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (open) {
      handleLoadStats()
    } else {
      setStats(initialStats)
    }
  }, [open])

  console.log('Stats:', seller)
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="g:w-[85vw] lg:max-w-[85vw] lg:h-[80vh] lg:max-h-[80vh]">
        <div className="flex flex-col h-full">
          <DialogHeader className="sticky top-0 z-10 bg-background p-6 border-b">
            <DialogTitle className="text-2xl">Estadísticas de: {seller?.fullName}</DialogTitle>

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

          <div className="flex-1 overflow-auto p-6">
            <ChartStatsUserByProduct
              stats={stats.filter(s => s.callsCount > 0)}  
              totalUniqueClients={totalUniqueClients}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default StatsModal
