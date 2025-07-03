'use client'
import { useState, useMemo } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, Phone, Users, Search, BarChart2 } from 'lucide-react'
import StatsModal from '../modals/StatsModal'
import { data } from 'react-router-dom'

const SellersTable = ({ data: sellersActive, typeSeller, color }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSeller, setSelectedSeller] = useState(null)
  const [statsModalOpen, setStatsModalOpen] = useState(false)

  const filteredSellers = useMemo(() => {
    if (!searchTerm) return sellersActive
    return sellersActive.filter(seller =>
      seller.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.phone.includes(searchTerm) ||
      seller.teamName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.address?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [sellersActive, searchTerm])

  const columns = [
    { key: 'index', label: '#', className: 'w-10' },
    { key: 'fullName', label: 'Nombres' },
    { key: 'phone', label: 'Teléfono' },
    { key: 'address', label: 'Dirección' },
    { key: 'createdAt', label: 'Fecha de Registro' },
    { key: 'teamName', label: 'Equipo' },
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
                  <TableCell className="font-medium">{seller.fullName}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {seller.phone}
                    </div>
                  </TableCell>
                  <TableCell>{seller.address ? seller.address : "No encontrado"}</TableCell>
                  <TableCell>
                    {new Date(seller.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {seller.teamName}
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