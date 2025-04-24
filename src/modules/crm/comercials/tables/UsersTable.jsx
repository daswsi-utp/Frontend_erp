'use client'
import { useState } from 'react'
import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
 Eye,
 UserCog,
 UserX,
 UserCheck,
 UserPlus
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import ReactCountryFlag from 'react-country-flag'

import ShowUserModal from '../Modals/Users/Show'
import NewUserModal from '../Modals/Users/New'
import UpdateUserModal from '../Modals/Users/Update'
import useCrud1 from '@/hooks/useCrud1'

const UsersTable = ({
 data,
 columns,
 loadData,
 showButtonNew,
 mainRoute,
 titleHeader = "Usuario"
}) => {
 const [userSelected, setUserSelected] = useState(null)
 const [showModal, setShowModal] = useState({
  show: false,
  new: false,
  update: false
 })
 const { updateModel } = useCrud1(mainRoute)

 const handleAccessChange = async (userId, action) => {
  const endpoint = `${mainRoute}/${userId}/${action}_access`
  await updateModel({}, endpoint)
  loadData()
 }

 return (
  <>
   <div className="space-y-4">
    {showButtonNew && (
     <Button
      className="float-right"
      onClick={() => setShowModal({ ...showModal, new: true })}
     >
      <UserPlus className="mr-2 h-4 w-4" />
      Nuevo {titleHeader}
     </Button>
    )}

    <div className="rounded-md border">
     <Table>
      <TableHeader>
       <TableRow>
        {columns.map((column) => (
         <TableHead key={column.key} className={column.className}>
          {column.label}
         </TableHead>
        ))}
       </TableRow>
      </TableHeader>
      <TableBody>
       {data.map((item) => (
        <TableRow key={item.id}>
         <TableCell>{item.index}</TableCell>
         <TableCell>{item.full_name}</TableCell>
         <TableCell>{item.document_number}</TableCell>
         <TableCell>{item.phone}</TableCell>
         <TableCell>
          <div className="flex items-center gap-2">
           <ReactCountryFlag
            countryCode={item.country_code}
            svg
            style={{ width: '1.5em', height: '1.5em' }}
           />
           {item.country}
          </div>
         </TableCell>
         <TableCell className="text-right space-x-2">
          <Button
           variant="ghost"
           size="sm"
           onClick={() => {
            setUserSelected(item)
            setShowModal({ ...showModal, show: true })
           }}
          >
           <Eye className="h-4 w-4" />
          </Button>

          <Button
           variant="ghost"
           size="sm"
           onClick={() => {
            setUserSelected(item)
            setShowModal({ ...showModal, update: true })
           }}
          >
           <UserCog className="h-4 w-4" />
          </Button>

          {item.user_status === "active" ? (
           <Button
            variant="ghost"
            size="sm"
            className="text-red-600"
            onClick={() => handleAccessChange(item.id, 'remove')}
           >
            <UserX className="h-4 w-4" />
           </Button>
          ) : (
           <Button
            variant="ghost"
            size="sm"
            className="text-green-600"
            onClick={() => handleAccessChange(item.id, 'set')}
           >
            <UserCheck className="h-4 w-4" />
           </Button>
          )}
         </TableCell>
        </TableRow>
       ))}
      </TableBody>
     </Table>
    </div>
   </div>

   {/* Modals */}
   <ShowUserModal
    open={showModal.show}
    onOpenChange={(open) => setShowModal({ ...showModal, show: open })}
    user={userSelected}
    titleHeader={titleHeader}
   />

   <NewUserModal
    open={showModal.new}
    onOpenChange={(open) => setShowModal({ ...showModal, new: open })}
    refreshData={loadData}
    titleHeader={titleHeader}
    mainRoute={mainRoute}
   />

   <UpdateUserModal
    open={showModal.update}
    onOpenChange={(open) => setShowModal({ ...showModal, update: open })}
    user={userSelected}
    refreshData={loadData}
    titleHeader={titleHeader}
    mainRoute={mainRoute}
   />
  </>
 )
}

export default UsersTable