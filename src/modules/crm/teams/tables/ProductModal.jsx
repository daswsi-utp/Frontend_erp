'use client'

import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import useCrud from '@/hooks/useCrud'
import useEntityMutation from '@/hooks/useEntityMutation'

const ProductModal = ({ showModal, handleClose, product }) => {
  const { getModel: getSalespersons} = useCrud('')
  const { mutateAsync} = useEntityMutation('leads')  

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
    setLoading(true);
    try {
      const { members, clients_bag } = await getSalespersons(`/crm/leads/members-and-bags/${product.code}`)
      setSalespersons(members)
      setBag(clients_bag) // Clientes libres
      console.log('Salespersons:', members)
      console.log('Bag (clientes libres):', clients_bag)

      
      setAssignments(
        members.reduce((acc, sp) => {
          acc[sp.user_id] = 0
          return acc
        }, {})
      )
    } catch (error) {
      console.error('Error fetching salespersons:', error)
    }
    setLoading(false)
  }

  const handleAssignmentChange2 = (salespersonId, value) => {
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
    }));
    
    try {
      await mutateAsync({action: 'update', entity: finalData, apiPath: `/crm/leads/assign_leads?productCode=${product.code}`});
      handleClose();
    } catch (error) {
      console.error('Error al asignar los leads:', error);
    }
  };
  
  

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
            <p><strong>Clientes libres: </strong>{bag}</p> {/* Mostrar la cantidad de clientes libres */}

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Comercial</TableHead>
                  <TableHead>{'Total NC'}</TableHead>
                  <TableHead>Total de Leads</TableHead>
                  <TableHead>Asignar Clientes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salespersons?.map((sp, idx) => (
                  <TableRow key={sp.user_id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{sp.full_name}</TableCell>
                    <TableCell className="text-center">{sp.total_nc}</TableCell>
                    <TableCell className="text-center">{sp.total_leads}</TableCell>
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
              <Button variant="outline" onClick={handleClose}>Cerrar</Button>
              <Button onClick={handleSubmit}>Asignar</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ProductModal
