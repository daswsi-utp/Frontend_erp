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
import { Eye, Pencil, Power, PowerOff, Plus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import ReactCountryFlag from 'react-country-flag'

import ShowUserModal from '../modals/ShowUserModal'
import NewUserModal from '../modals/NewUserModal'
import UpdateUserModal from '../modals/UpdateUserModal'
import useCrud1 from '@/hooks/useCrud1'

const UsersTable = ({
  data = [],
  columns = [],
  loadData,
  showButtonNew = false,
  mainRoute,
  titleHeader = "Usuario"
}) => {
  const [selectedUser, setSelectedUser] = useState(null)
  const [modalState, setModalState] = useState({
    show: false,
    new: false,
    edit: false
  })
  
  const { updateModel } = useCrud1(mainRoute)

  const toggleUserStatus = async (userId, action) => {
    try {
      await updateModel({}, `${mainRoute}/${userId}/${action}_access`)
      loadData()
    } catch (error) {
      console.error("Error changing user status:", error)
    }
  }

  const handleOpenModal = (type, user = null) => {
    setSelectedUser(user)
    setModalState(prev => ({
      ...prev,
      [type]: true
    }))
  }

  const handleCloseModal = (type) => {
    setModalState(prev => ({
      ...prev,
      [type]: false
    }))
    setSelectedUser(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        {showButtonNew && (
          <Button onClick={() => handleOpenModal('new')}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo {titleHeader}
          </Button>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead 
                  key={column.key} 
                  className={column.className || ''}
                >
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.index}</TableCell>
                  <TableCell className="font-medium">{user.full_name}</TableCell>
                  <TableCell>{user.document_number}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <ReactCountryFlag
                        countryCode={user.country_code}
                        svg
                        style={{ width: '1.5em', height: '1.5em' }}
                      />
                      {user.country}
                    </div>
                  </TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenModal('show', user)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenModal('edit', user)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className={user.user_status === "active" 
                        ? "text-red-600 hover:text-red-700" 
                        : "text-green-600 hover:text-green-700"}
                      onClick={() => toggleUserStatus(
                        user.id, 
                        user.user_status === "active" ? 'remove' : 'set'
                      )}
                    >
                      {user.user_status === "active" ? (
                        <PowerOff className="h-4 w-4" />
                      ) : (
                        <Power className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No se encontraron resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* User Modals */}
      <ShowUserModal
        open={modalState.show}
        onOpenChange={(open) => handleCloseModal('show')}
        user={selectedUser}
        titleHeader={titleHeader}
      />

      <NewUserModal
        open={modalState.new}
        onOpenChange={(open) => handleCloseModal('new')}
        refreshData={loadData}
        titleHeader={titleHeader}
        mainRoute={mainRoute}
      />

      <UpdateUserModal
        open={modalState.edit}
        onOpenChange={(open) => handleCloseModal('edit')}
        user={selectedUser}
        refreshData={loadData}
        titleHeader={titleHeader}
        mainRoute={mainRoute}
      />
    </div>
  )
}

export default UsersTable