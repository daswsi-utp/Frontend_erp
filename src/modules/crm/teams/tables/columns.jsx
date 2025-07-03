// columns.js
import React from 'react'
import { TbEye, TbTrash, TbEdit } from "react-icons/tb"
import GeneralTooltip from '@/components/shared/generalTooltip';
import { Badge } from '@/components/ui/badge'
import { HiCurrencyDollar } from "react-icons/hi";
import { FaSchool } from "react-icons/fa6";
import { FaSync } from 'react-icons/fa';


const columns = (handleShow) => [
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
   accessorKey: 'napricePEn',
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
  accessorKey: 'PRICEDOLLAR',
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
    header: 'Acciones',
    cell: ({ row }) => (
      <div className=" space-x-1 grid grid-cols-2 gap-3 ">
        <GeneralTooltip
          content={`Ver el producto ${row?.original.name}`}
          triggerContent={
            <span className="bg-blue-600 text-white rounded-full p-1 cursor-pointer">
              <TbEye size={25} />
            </span>
          }
          onClick={() => handleShow(row?.original, "show")}
        />
        
      </div>
    ),
  },
]

export default columns
