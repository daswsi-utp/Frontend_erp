import React, { useMemo } from 'react'
import DataTable from '@/components/shared/data_table'
import columns from './columns'
import useEntityMutation from '@/hooks/useEntityMutation'
import { useNavigate } from 'react-router-dom'

const TableProducts = ({ handleOpenModal, data, fetchData, pagination, setPagination, setProduct, setTypeModal, totalPages, search, setSearch, searchFields, setSearchFields }) => {
  const { mutateAsync } = useEntityMutation('products') 
  // const navigate = useNavigate()

  const handleDelete = async (id) => {
    try {
      await mutateAsync(
        { action: 'delete', apiPath: `/api/v1/admin/products/${id}` },
      )
    } catch (error) {
      console.error('Error al eliminar el producto:', error)
    }
  }

  const handleUpdate = (product) => {
    setProduct(product)
    setTypeModal('edit')
    handleOpenModal('edit', product)
  }

  const handleShow = (product) => {
    setProduct(product)
    setTypeModal('show')
    handleOpenModal('show', product)
  }

  const handleAddToCart = (product) => {
    console.log('Producto agregado al carrito:', product)
  }

  const columnsWithActions = useMemo(() => columns(handleDelete, handleUpdate, handleShow, handleAddToCart), [handleDelete, handleUpdate, handleShow, handleAddToCart])

  const sortedData = useMemo(() => {
    if (!data) return []
    return data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) 
  }, [data])

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
