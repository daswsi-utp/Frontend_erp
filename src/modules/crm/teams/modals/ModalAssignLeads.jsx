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
import useEntityMutation from '@/hooks/useEntityMutation'

const ModalAssignLeads = ({ comercial, open, onOpenChange }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'))
  const { getModel: getProducts } = useCrud('')
  const { insertModel: assignLeads } = useCrud('')
  const { mutateAsync } = useEntityMutation('leads')
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
    } catch (error) {
      console.error('Error al cargar los productos:', error)
    }
  }

  const onChangeCalculateLeads = (e, productName) => {
    const value = Math.min(e.target.value, products.find(p => p.productName === productName)?.availableLeads || 0)
    setTotalLeadsAssigned((prev) => ({ ...prev, [productName]: value }))
  }

  const handleSubmitAssignLeads = async (e) => {
    e.preventDefault()

    const leadsAssign = Object.entries(totalLeadsAssigned).map(([productName, totalLeads]) => {
      const product = products.find(p => p.productName === productName)
      return {
        productName,
        totalLeads,
        productId: product.productId, // Aquí agregamos el productId
        userId: comercial.id,
        assignerName: `${currentUser.email}`,
      }
    })

    console.log('Leads a asignar:', leadsAssign)

    try {
      await mutateAsync({
        action: 'update',
        entity: leadsAssign,
        apiPath: `/crm/members/${comercial.id}/assign-leads`,
      })
      await loadProducts(comercial.id)
      setTotalLeadsAssigned({})
      onOpenChange(false)
    } catch (error) {
      console.error('Error al asignar leads:', error)
    }
  }



  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-4xl bg-gray-800 text-white rounded-lg shadow-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-center mb-4">
              Asignar Leads al comercial {comercial?.fullName}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitAssignLeads} noValidate>
            <div className="space-y-6 mt-4">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b bg-gray-700">
                    <th className="text-left p-3 text-gray-300">Producto</th>
                    <th className="text-left p-3 text-gray-300">Leads Totales</th>
                    <th className="text-left p-3 text-gray-300">Leads Disponibles</th>
                    <th className="text-left p-3 text-gray-300">Asignar Leads</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.productName} className="border-b hover:bg-gray-700">
                      <td className="p-3">{product.productName}</td>
                      <td className="p-3">{product.totalLeads}</td>
                      <td className="p-3">{product.availableLeads}</td>
                      <td className="p-3">
                        <Input
                          type="number"
                          min={0}
                          max={product.availableLeads}
                          value={totalLeadsAssigned[product.productName] || 0}
                          onChange={(e) => onChangeCalculateLeads(e, product.productName)}
                          className="w-20 p-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <DialogFooter className="mt-6 flex justify-end space-x-4">
              <Button variant="outline" onClick={() => onOpenChange(false)} className="text-gray-300 border-gray-500 hover:bg-gray-700">
                Cancelar
              </Button>
              <Button type="submit" disabled={Object.keys(totalLeadsAssigned).length === 0} className="bg-blue-600 hover:bg-blue-700 text-white">
                Asignar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ModalAssignLeads
