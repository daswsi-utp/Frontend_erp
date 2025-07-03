'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TbPlus } from 'react-icons/tb'
import TableProducts from '@/modules/crm/teams/tables/ProductTable'
import useFetchProducts from '@/modules/crm/teams/hooks/useFetchProducts'
import ProductModal from '@/modules/crm/teams/tables/ProductModal'
import ModalShowProduct from '@/modules/crm/teams/modals/ModalShowProduct'


const Products = () => {
  const [typeModal, setTypeModal] = useState('')
  const [product, setProduct] = useState(null) 
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const [search, setSearch] = useState('')
  const [searchFields, setSearchFields] = useState(['name'])

  const handleOpenModal = (type, data = null) => {
    setIsModalOpen(true)
    setTypeModal(type)
    setProduct(data)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTypeModal('')
    setProduct(null)
  }

  const { data: fetchProducts, refetch: refetchProducts } = useFetchProducts({
    pagination,
    search,
    searchFields,
  })


  const totalPages = Math.ceil((fetchProducts?.rowCount || 0) / pagination.pageSize)

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-1">
      <Card className="col-span-1 lg:col-span-1">
        <CardHeader>
          <CardTitle>Listado de Productos</CardTitle>
        </CardHeader>
        <CardContent className="px-4">

          <TableProducts
            handleOpenModal={handleOpenModal}
            fetchData={refetchProducts}
            data={fetchProducts?.rows || []} 
            pagination={pagination}
            setPagination={setPagination}
            setProduct={setProduct}
            setTypeModal={setTypeModal}
            search={search}
            setSearch={setSearch}
            searchFields={searchFields}
            setSearchFields={setSearchFields}
            totalPages={totalPages}
          />
        </CardContent>
      </Card>

      {typeModal === 'show' && (
        <ModalShowProduct
          showModal={isModalOpen}
          handleClose={handleCloseModal}
          product={product}
        />
      )}

      {typeModal === 'new_clients' && (
        <ProductModal
          showModal={isModalOpen}
          typeModal={typeModal}
          handleClose={handleCloseModal}
          product={product}
        />
      )}
    </div>
  )
}

export default Products
