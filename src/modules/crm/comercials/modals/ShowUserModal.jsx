// ShowUserModal.jsx
'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import ReactCountryFlag from 'react-country-flag'

const ShowUserModal = ({ open, onOpenChange, user, titleHeader = "Usuario" }) => {
  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>
            Detalles del {titleHeader}: {user.full_name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Dirección</p>
              <p className="text-sm">
                {user.address}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Contacto</p>
              <p className="text-sm">{user.phone} </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Equipo</p>
              <p className="text-sm">{user.teamName} </p>
            </div>
            <div>
              <p className="text-sm font-medium">Estado</p>
              <Badge
                variant={user.status === 0 ? "default" : "destructive"}
              >
                {user.status === 1 ? "ACTIVO" : "INACTIVO"}
              </Badge>
            </div>
          </div>
         
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ShowUserModal