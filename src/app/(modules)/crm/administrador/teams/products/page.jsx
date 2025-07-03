'use client'
import React, { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TbPlus } from 'react-icons/tb'
import TableProducts from '@/modules/crm/teams/tables/ProductTable'
// import ModalShowProgram from '@/composables/Products/modals/ModalShowProgram'
import useFetchProducts from '@/modules/crm/teams/hooks/useFetchProducts'

const Products = () => {
  const [typeModal, setTypeModal] = useState('')
  const [program, setProgram] = useState(null)
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
    setProgram(data)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTypeModal('')
    setProgram(null)
  }

  const { data: fetchProducts, refetch: refetchProducts} = useFetchProducts({ pagination, search, searchFields })
  const totalPages = Math.ceil((fetchProducts?.rowCount || 0) / pagination.pageSize)

  const { data: options } = useFetchOptions()

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-1">
      <Card className="col-span-1 lg:col-span-1">
        <CardHeader>
          <CardTitle>Listado de Programas</CardTitle>
        </CardHeader>
        <CardContent className="px-4">
          <Button
            variant="outline"
            onClick={() => handleOpenModal("new")}
            className="bg-green-300 text-black hover:bg-green-600 justify-start"
          >
            <TbPlus /> Crear Programa
          </Button>

          <TableProducts
            setTypeModal={setTypeModal}
            handleOpenModal={handleOpenModal}
            setProgram={setProgram}
            program={program}
            fetchData={refetchPrograms}
            data={programsData?.rows || []}
            pagination={pagination}
            setPagination={setPagination}
            search={search}
            setSearch={setSearch}
            searchFields={searchFields}
            setSearchFields={setSearchFields}
            totalPages={totalPages}
          />
        </CardContent>
      </Card>
     
      {/* {typeModal === 'show' && (
        <ModalShowProgram
          isOpen={isModalOpen}
          handleClose={handleCloseModal}
          program={program}
        />
      )} */}
      
    </div>
  )
}

export default Products
