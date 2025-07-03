import React from 'react'
import { TbEye, TbTrash, TbEdit } from "react-icons/tb"
import GeneralTooltip from '@/components/shared/generalTooltip'
import { Badge } from '@/components/ui/badge'

const columns = (handleShow, handleProduct) => [
  {
    header: 'No.',  // Numeración
    cell: ({ row }) => (
      <Badge variant="outline" className="text-white">
        {row.index + 1}  {/* Muestra el índice más 1 */}
      </Badge>
    ),
    enableColumnFilter: false,  // Deshabilitamos el filtro para esta columna
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ row }) => (
      <GeneralTooltip
        content={row.original.code}
        triggerContent={<Badge variant="outline" className="text-white">{row.original.name}</Badge>}
      />
    ),
    enableColumnFilter: true,
  },
  {
    accessorKey: 'pricePen',  // Precio en soles
    header: 'Precio (S/)',
    cell: ({ row }) => (
      <Badge variant="outline" className="text-white">{row.original.pricePen}</Badge>
    ),
    enableColumnFilter: true,
  },
  {
    accessorKey: 'priceDollar',  // Precio en dólares
    header: 'Precio (USD)',
    cell: ({ row }) => (
      <Badge variant="outline" className="text-white">{row.original.priceDollar}</Badge>
    ),
    enableColumnFilter: true,
  },
  {
    accessorKey: 'status',  // Estado
    header: 'Estado',
    cell: ({ row }) => (
      <Badge variant="outline" className={row.original.status === 1 ? "bg-green-600" : "bg-red-600"}>
        {row.original.status === 1 ? 'Activo' : 'Inactivo'}
      </Badge>
    ),
    enableColumnFilter: true,
  },
  {
    header: 'Acciones',
    cell: ({ row }) => (
      <div className="space-x-1 grid grid-cols-2 gap-3">


        <GeneralTooltip
          content={`Leads producto ${row?.original.name}`}
          triggerContent={
            <span className="bg-yellow-600 text-white rounded-full p-1 cursor-pointer">
              <TbEye size={20} />
            </span>
          }
          onClick={() => handleProduct(row?.original)}
        />

        <GeneralTooltip
          content={`Ver el producto ${row?.original.name}`}
          triggerContent={
            <span className="bg-blue-600 text-white rounded-full p-1 cursor-pointer">
              <TbEdit size={25} />
            </span>
          }
          onClick={() => handleShow(row?.original)}
        />

      </div>
    ),
  },
]

export default columns
