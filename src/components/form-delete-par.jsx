import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ScrollAreaUsers from "./scroll-area-users";
import useCrud from "@/hooks/useCrud";

const DeleteParticipant = () => {
  const [selectedIds, setSelectedIds] = useState(new Set())
  const [refreshFlag, setRefreshFlag] = useState(false)
  const { deleteModel } = useCrud("/planning/participant")

  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      for (const id of selectedIds) {
        await deleteModel(`/planning/participant/delete/${id}`)
      }
      setSelectedIds(new Set())
      setRefreshFlag(prev => !prev)
    } catch (error) {
      console.error("Error eliminando participantes:", error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Eliminar Participante -</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar Participante</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleDelete}>
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium mb-1">Selecciona</label>
            <ScrollAreaUsers
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
              refreshFlag={refreshFlag}
            />
          </div>
          <Button type="submit">Eliminar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteParticipant
