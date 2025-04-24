import React from 'react'
import { Button } from "@/components/shared/button"
import Modal from '@/components/shared/modal'

const ModalHistoryLead = ({ open, setOpen, data, setDataHistory }) => {
  const handleClose = () => {
    setOpen(false)
    setDataHistory({})
  }

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      size="xl"
      title="Historial completo del cliente"
    >
      <div className="space-y-4">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((item, index) => (
            <div key={index} className="space-y-2 rounded-lg border p-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium">Cliente</p>
                  <p className="text-sm text-muted-foreground">{item.full_name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Producto</p>
                  <p className="text-sm text-muted-foreground">{item.product}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Comercial</p>
                  <p className="text-sm text-muted-foreground">
                    {item.calls[0] && item.calls[0].comercial_new}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Llamadas</p>
                <ul className="space-y-3">
                  {item.calls.map((call, callIndex) => (
                    <li key={callIndex} className="rounded border p-3">
                      <p className="text-sm font-medium">Fecha de Llamada</p>
                      <p className="text-sm text-muted-foreground">{call.date_call}</p>
                      <p className="mt-2 text-sm font-medium">Notas</p>
                      <p className="text-sm text-muted-foreground">{call.notes}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No hay datos de historial disponibles</p>
        )}
      </div>
    </Modal>
  )
}

export default ModalHistoryLead