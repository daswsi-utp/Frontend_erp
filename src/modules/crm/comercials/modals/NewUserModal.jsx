// NewUserModal.jsx
'use client'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useCrud1 from '@/hooks/useCrud1'

const NewUserModal = ({ open, onOpenChange, refreshData, titleHeader = "Usuario", mainRoute }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    document_type: 'dni',
    document_number: '',
    email: '',
    phone: '',
    gender: ''
  })
  const [loading, setLoading] = useState(false)
  const { insertModel } = useCrud1(mainRoute)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await insertModel(formData)
      refreshData()
      onOpenChange(false)
      setFormData({
        first_name: '',
        last_name: '',
        document_type: 'dni',
        document_number: '',
        email: '',
        phone: '',
        gender: ''
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Crear nuevo {titleHeader}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nombres</Label>
              <Input
                value={formData.first_name}
                onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                placeholder="Ej: Juan"
              />
            </div>
            <div className="space-y-2">
              <Label>Apellidos</Label>
              <Input
                value={formData.last_name}
                onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                placeholder="Ej: Pérez"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tipo de documento</Label>
              <Select
                value={formData.document_type}
                onValueChange={(value) => setFormData({...formData, document_type: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dni">DNI</SelectItem>
                  <SelectItem value="foreigner_card">Carnet extranjería</SelectItem>
                  <SelectItem value="passport">Pasaporte</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Número de documento</Label>
              <Input
                value={formData.document_number}
                onChange={(e) => setFormData({...formData, document_number: e.target.value})}
                placeholder="Ej: 12345678"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Ej: usuario@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Teléfono</Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="Ej: 999888777"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Género</Label>
            <Select
              value={formData.gender}
              onValueChange={(value) => setFormData({...formData, gender: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Masculino</SelectItem>
                <SelectItem value="female">Femenino</SelectItem>
                <SelectItem value="other">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default NewUserModal