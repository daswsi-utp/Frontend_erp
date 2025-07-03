import React, { useMemo } from 'react'
import DataTable from '@/components/shared/data_table'
import columns from './columns'
import useEntityMutation from '@/hooks/useEntityMutation'
import { useNavigate } from 'react-router-dom'

const TableProducts = ({ handleOpenModal, data, fetchData, pagination, setPagination, setProduct, setTypeModal, totalPages, search, setSearch, searchFields, setSearchFields }) => {
  const { mutateAsync } = useEntityMutation('products')
  // const navigate = useNavigate()
 

  const handleShow = (product) => {
    setProduct(product)
    setTypeModal('show')  
    handleOpenModal('show', product)  
  }

  const handleProduct = (product) => {
    setProduct(product)
    setTypeModal('new_clients')  
    handleOpenModal('new_clients', product)  
  }


 
  const columnsWithActions = useMemo(() => columns( handleShow,handleProduct), [ handleShow, handleProduct])

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
