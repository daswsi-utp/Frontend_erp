import React, { useState } from "react"
import ScrollAreaSelectTasks from "./scroll-area-SelectTasks"
import { Button } from "./shared/button"
import { Dialog, DialogTrigger, DialogHeader, DialogTitle, DialogContent } from "./ui/dialog"
import useCrud from "@/hooks/useCrud"
import useEntityMutation from "@/hooks/useEntityMutation"

const DeleteTaskForm = ({ onTaskUpdate, tasks }) => {
  const [selectedTaskIds, setSelectedTaskIds] = useState(new Set())
  const [reloadTrigger, setReloadTrigger] = useState(false) // ← NUEVO
  const { deleteModel } = useCrud("/planning/task")

  const taskMutation = useEntityMutation('task')
  
  const deleteTask = async (id) =>{
    try {
      taskMutation.mutate({
        action: 'delete',
        id: id,
        entity: {},
        apiPath: `/planning/task/delete/${id}`
      })
    } catch (error) {
      console.error("Error during delete task", error)
    }
  }
  
  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      for (const id of selectedTaskIds) {
        await deleteTask(id)
      }
      setSelectedTaskIds(new Set())
      setReloadTrigger(prev => !prev)
      if (onTaskUpdate) onTaskUpdate();
    } catch (error) {
      console.error("Error al eliminar tareas:", error)
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
            reloadTrigger={reloadTrigger}
            tasks={tasks}
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
