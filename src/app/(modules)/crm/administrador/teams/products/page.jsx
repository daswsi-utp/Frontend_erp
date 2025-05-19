'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import useCrud from '@/hooks/useCrud'

import ProductModal from '@/modules/crm/teams/tables/ProductModal'
import ProductTable from '@/modules/crm/teams/tables/ProductTable'

const Products = () => {
  const { getModelData: getProducts } = useCrud('')

  const [products, setProducts] = useState(null)
  const [product, setProduct] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [typeModal, setTypeModal] = useState('')

  const handleClose = () => {
    setProduct(null)
    setTypeModal('')
    setShowModal(false)
  }

  const handleOpenModal = (typeModal, product) => {
    setProduct(product)
    setTypeModal(typeModal)
    setShowModal(true)
  }

  const loadData = async () => {
    const { products } = await getProducts('/api/v2/general/products/active')
    setProducts(products)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Productos Activos</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductTable products={products} handleOpenModal={handleOpenModal} />
        </CardContent>
      </Card>

      {product && (
        <ProductModal
          showModal={showModal}
          typeModal={typeModal}
          handleClose={handleClose}
          product={product}
        />
      )}
    </>
  )
}

export default Products
