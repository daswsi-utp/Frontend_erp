'use client'

import React, { useState, useMemo } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import ProductModal from '@/modules/crm/teams/tables/ProductModal'
import ProductTable from '@/modules/crm/teams/tables/ProductTable'
import useFetchProducts from '@/hooks/useFetchProducts'
import DataTable from '@/components/shared/data_table'
import useEntityMutation from '@/hooks/useEntityMutation'
import { useNavigate } from 'react-router-dom'

const TableProducts = () => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
  const [search, setSearch] = useState('')
  const [searchFields, setSearchFields] = useState(['name', 'code'])

  const { data, isLoading, isError, error, refetch } = useFetchProducts({
    pagination,
    search,
    searchFields,
  })

  const [showModal, setShowModal] = useState(false)
  const [product, setProduct] = useState(null)
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

  useEffect(() => {
    refetch() // Recargar los datos cuando cambie la paginación o búsqueda
  }, [pagination, search])

  return (
    <div>
      <DataTable
        columns={columnsWithActions}
        data={sortedData}
        fetchData={() => fetchData(pagination)}
        pagination={pagination}
        setPagination={setPagination}
        totalPages={totalPages}
        search={search}
        setSearch={setSearch}
        searchFields={searchFields}
        setSearchFields={setSearchFields}
        searchableFields={['name', 'code']}
      />
    </div>
  )
}

export default TableProducts
