'use client'
import { Badge } from '@/components/ui/badge'
import UsersTable from './UsersTable'

const columns = [
 { key: 'index', label: '#', className: 'w-10' },
 { key: "fullName", label: 'Nombres Completos' },
 { key: 'crmRole', label: 'Rol' },
 { key: 'phone', label: 'Teléfono' },
 { key: 'address', label: 'Dirección' },
 { key: 'actions', label: 'Acciones', className: 'text-right' }
]

const ActiveTable = ({ data, loadData, showButtonNew }) => {
 return (
  <div className="space-y-4">
   <Badge variant="outline" className="text-green-600 border-green-600">
    Listado completo de ejecutivos de ventas ACTIVOS
   </Badge>

   <UsersTable
    data={data}
    columns={columns}
    loadData={loadData}
    showButtonNew={showButtonNew}
    titleHeader="Ejecutivo"
   />
  </div>
 )
}
export default ActiveTable