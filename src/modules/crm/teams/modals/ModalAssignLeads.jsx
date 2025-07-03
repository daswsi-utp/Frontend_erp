'use client'

import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import useCrud from '@/hooks/useCrud'

const ModalAssignLeads = ({ comercial, open, onOpenChange }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'))
  const { getModel: getProducts } = useCrud('')
  const { insertModel: assignLeads } = useCrud('')

  const [products, setProducts] = useState([])
  const [totalLeadsAssigned, setTotalLeadsAssigned] = useState({})

  useEffect(() => {
    if (comercial && comercial.id) {
      loadProducts(comercial.id)
    }
  }, [comercial])

  const loadProducts = async (memberId) => {
    try {
      const productsData = await getProducts(`/crm/members/${memberId}/leads`)
      setProducts(productsData)
      console.log('Productos cargados:', productsData)
    } catch (error) {
      console.error('Error al cargar los productos:', error)
    }
  }

  const onChangeCalculateLeads = (e, productName) => {
    const value = Math.min(e.target.value, products.find(p => p.productName === productName)?.totalLeads || 0)
    setTotalLeadsAssigned((prev) => ({ ...prev, [productName]: value }))
  }

  const handleSubmitAssignLeads = async (e) => {
    e.preventDefault()

    const leadsAssign = Object.entries(totalLeadsAssigned).map(([productName, totalLeads]) => ({
      productName,
      totalLeads,
      userId: comercial.id,
      assignerName: `${currentUser.first_name} ${currentUser.last_name}`,
    }))

    await assignLeads(leadsAssign, '/api/v1/general/leads/assign_to_user', () => onOpenChange(false))
    setTotalLeadsAssigned({})
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            Asignar Leads al comercial {comercial?.fullName}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmitAssignLeads} noValidate>
          <div className="space-y-6 mt-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Producto</th>
                  <th className="text-left p-2">Leads Totales</th>
                  <th className="text-left p-2">Asignar Leads</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.productName} className="border-b hover:bg-muted">
                    <td className="p-2">{product.productName}</td>
                    <td className="p-2">{product.totalLeads}</td>
                    <td className="p-2">
                      <Input
                        type="number"
                        min={0}
                        max={product.totalLeads}
                        value={totalLeadsAssigned[product.productName] || 0}
                        onChange={(e) => onChangeCalculateLeads(e, product.productName)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <DialogFooter className="mt-6 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={Object.keys(totalLeadsAssigned).length === 0}>
              Asignar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ModalAssignLeads
