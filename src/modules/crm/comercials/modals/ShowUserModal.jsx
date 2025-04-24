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
              <p className="text-sm font-medium">Documento</p>
              <p className="text-sm">
                {user.document_type}: {user.document_number}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Contacto</p>
              <p className="text-sm">{user.phone} | {user.email}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium">Ubicación</p>
            <div className="flex items-center gap-2 text-sm">
              <ReactCountryFlag
                countryCode={user.country_code}
                svg
                style={{ width: '1em', height: '1em' }}
              />
              {user.city}, {user.country}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium">Estado</p>
            <Badge 
              variant={user.user_status === "active" ? "default" : "destructive"}
            >
              {user.user_status === "active" ? "ACTIVO" : "INACTIVO"}
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ShowUserModal