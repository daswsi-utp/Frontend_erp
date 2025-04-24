'use client'
import { Badge } from '@/components/ui/badge'
import UsersTable from './UsersTable'

const columns = [
 { key: 'index', label: '#', className: 'w-10' },
 { key: "full_name", label: 'Nombres Completos' },
 { key: 'document_number', label: 'Nº de Documento' },
 { key: 'phone', label: 'Teléfono' },
 { key: 'country', label: 'País' },
 { key: 'actions', label: 'Acciones', className: 'text-right' }
]

const InactiveTable = ({ data, loadData, mainRoute }) => {
 return (
  <div className="space-y-4">
   <Badge variant="outline" className="text-red-600 border-red-600">
    Listado completo de ejecutivos de ventas INACTIVOS
   </Badge>

   <UsersTable
    data={data}
    columns={columns}
    loadData={loadData}
    mainRoute={mainRoute}
   />
  </div>
 )
}
export default InactiveTable