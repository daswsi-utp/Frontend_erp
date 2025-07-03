'use client'

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

const ModalShowProduct = ({ showModal, handleClose, product }) => {
  return (
    <Dialog open={showModal} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle>Detalles del Producto: {product?.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <p><strong>Nombre:</strong> {product?.name}</p>
          <p><strong>Código:</strong> {product?.code}</p>
          <p><strong>Precio (S/):</strong> {product?.pricePen}</p>
          <p><strong>Precio (USD):</strong> {product?.priceDollar}</p>
          <p><strong>Descripción:</strong> {product?.description}</p>
          <p><strong>Estado:</strong> {product?.status === 1 ? 'Activo' : 'Inactivo'}</p>
        </div>
        <DialogFooter className="space-x-2">
          <Button variant="outline" onClick={handleClose}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ModalShowProduct
