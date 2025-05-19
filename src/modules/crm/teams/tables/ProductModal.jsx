'use client'

import React, { useState, useEffect } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Label } from '@/components/ui/label'
import useCrud from '@/hooks/useCrud'

const ProductModal = ({ showModal, typeModal, handleClose, product }) => {
  const { getModelData: getSalespersons, insertModelWithConfirmation: assignLeads } = useCrud('')

  const [salespersons, setSalespersons] = useState([])
  const [loading, setLoading] = useState(false)
  const [bag, setBag] = useState(0)
  const [assignments, setAssignments] = useState({})

  useEffect(() => {
    if (showModal && product) {
      loadData()
    }
  }, [showModal, product])

  const loadData = async () => {
    setLoading(true)
    const { salespersons, clients_bag } = await getSalespersons(
      `/api/v2/admin/products/${product.code}/salespersons?leads_type=${typeModal}`
    )
    setSalespersons(salespersons)
    setBag(clients_bag)

    // Inicializa asignaciones en 0
    setAssignments(
      salespersons.reduce((acc, sp) => {
        acc[sp.user_id] = 0
        return acc
      }, {})
    )
    setLoading(false)
  }

  const handleAssignmentChange = (salespersonId, value) => {
    const newValue = parseInt(value, 10)
    if (newValue < 0) return

    const totalAssigned = Object.values(assignments).reduce((sum, val) => sum + val, 0)
    const remainingBag = bag - totalAssigned + assignments[salespersonId]

    if (newValue <= remainingBag) {
      setAssignments((prev) => ({
        ...prev,
        [salespersonId]: newValue,
      }))
    }
  }

  const totalAssigned = Object.values(assignments).reduce((sum, val) => sum + val, 0)
  const remainingBag = bag - totalAssigned

  const handleSubmit = async () => {
    const finalData = Object.entries(assignments).map(([userId, totalAssign]) => ({
      user_id: userId,
      total_assign: totalAssign,
    }))

    await assignLeads(
      { data: finalData },
      `/api/v2/admin/products/${product.code}/assign_leads?leads_type=${typeModal}`,
      null
    )
    handleClose()
  }

  return (
    <Dialog open={showModal} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle>Asignar Leads para {product.name}</DialogTitle>
        </DialogHeader>

        {loading ? (
          <p>Cargando...</p>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Comercial</TableHead>
                  <TableHead>{typeModal === 'new_leads' ? 'Total NC' : 'Total BH'}</TableHead>
                  <TableHead>Total de Leads</TableHead>
                  <TableHead>{typeModal === 'new_leads' ? 'Bolsa NC' : 'Bolsa BH'}</TableHead>
                  <TableHead>Asignar Clientes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salespersons?.map((sp, idx) => (
                  <TableRow key={sp.user_id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{sp.full_name}</TableCell>
                    <TableCell className="text-center">
                      {typeModal === 'new_leads' ? sp.total_nc : sp.total_bh}
                    </TableCell>
                    <TableCell className="text-center">{sp.total_leads}</TableCell>
                    <TableCell className="text-center">{remainingBag}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={assignments[sp.user_id]}
                        onChange={(e) => handleAssignmentChange(sp.user_id, e.target.value)}
                        disabled={remainingBag <= 0}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <DialogFooter className="space-x-2">
              <Button variant="outline" onClick={handleClose}>
                Cerrar
              </Button>
              <Button onClick={handleSubmit}>Asignar</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ProductModal
