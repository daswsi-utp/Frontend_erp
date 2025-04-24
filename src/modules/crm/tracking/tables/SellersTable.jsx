'use client'
import { useState, useMemo } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, Phone, Users, Search, BarChart2 } from 'lucide-react'
import StatsModal from '../modals/StatsModal'

const SellersTable = ({ data: sellersActive, typeSeller, color }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSeller, setSelectedSeller] = useState(null)
  const [statsModalOpen, setStatsModalOpen] = useState(false)

  const filteredSellers = useMemo(() => {
    if (!searchTerm) return sellersActive
    return sellersActive.filter(seller =>
      seller.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.phone.includes(searchTerm) ||
      seller.team?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.country?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [sellersActive, searchTerm])

  const columns = [
    { key: 'index', label: '#', className: 'w-10' },
    { key: 'full_name', label: 'Nombres' },
    { key: 'phone', label: 'Teléfono' },
    { key: 'country', label: 'País' },
    { key: 'created_at', label: 'Fecha de Registro' },
    { key: 'team', label: 'Equipo' },
    { key: 'actions', label: 'Acciones', className: 'text-right' }
  ]

  const typeColorVariants = {
    green: 'bg-green-100 text-green-800',
    orange: 'bg-orange-100 text-orange-800',
    red: 'bg-red-100 text-red-800'
  }

  const handleOpenStats = (seller) => {
    setSelectedSeller(seller)
    setStatsModalOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Badge className={`${typeColorVariants[color]} text-xs w-fit`}>
          Listado completo de {typeSeller} ACTIVOS
        </Badge>
        
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar asesor..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key} className={column.className}>
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSellers.length > 0 ? (
              filteredSellers.map((seller) => (
                <TableRow key={seller.id || seller.index}>
                  <TableCell>{seller.index}</TableCell>
                  <TableCell className="font-medium">{seller.full_name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {seller.phone}
                    </div>
                  </TableCell>
                  <TableCell>{seller.country}</TableCell>
                  <TableCell>
                    {new Date(seller.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {seller.team}
                    </div>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleOpenStats(seller)}
                    >
                      <BarChart2 className="h-4 w-4" />
                    </Button>
                    {/* <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button> */}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No se encontraron resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <StatsModal
        seller={selectedSeller}
        open={statsModalOpen}
        onOpenChange={setStatsModalOpen}
      />
    </div>
  )
}

export default SellersTable