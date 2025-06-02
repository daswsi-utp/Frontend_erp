import React, { useState } from "react"
import ScrollAreaSelectTasks from "./scroll-area-SelectTasks"
import { Button } from "./shared/button"
import { Dialog, DialogTrigger, DialogHeader, DialogTitle, DialogContent } from "./ui/dialog"
import useCrud from "@/hooks/useCrud"

const DeleteTaskForm = () => {
  const [selectedTaskIds, setSelectedTaskIds] = useState(new Set())
  const [reloadTrigger, setReloadTrigger] = useState(false) // ← NUEVO
  const { deleteModel } = useCrud("/planning/task")

  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      for (const id of selectedTaskIds) {
        await deleteModel(`/planning/task/delete/${id}`)
      }
      alert("Tareas eliminadas correctamente")
      setSelectedTaskIds(new Set())
      setReloadTrigger(prev => !prev) // ← CAMBIA trigger para recargar tareas
    } catch (error) {
      console.error("Error al eliminar tareas:", error)
      alert("Error al eliminar tareas")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Eliminar Tarea +</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar Tarea</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleDelete}>
          <ScrollAreaSelectTasks
            selectedTaskIds={selectedTaskIds}
            setSelectedTaskIds={setSelectedTaskIds}
            reloadTrigger={reloadTrigger} // ← PASAMOS trigger
          />
          <Button type="submit" className="mt-2" disabled={selectedTaskIds.size === 0}>
            Eliminar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteTaskForm
