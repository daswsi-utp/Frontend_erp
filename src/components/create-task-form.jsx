import React, { useState } from "react"
import { Dialog, DialogTrigger, DialogHeader, DialogTitle, DialogContent } from "./ui/dialog"
import { Button } from "./ui/button"
import ScrollAreaUsers from "./scroll-area-users"
import useCrud from "@/hooks/useCrud"
import useEntityMutation from "@/hooks/useEntityMutation"

const CreateTaskForm = ({ planId, onTaskUpdate , participants = []}) => {
  const [taskName, setTaskName] = useState("")
  const [taskDescription, setTaskDescription] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [selectedIds, setSelectedIds] = useState(new Set())
  const { insertModel } = useCrud("/planning/task")
  const taskMutation = useEntityMutation('task')


  const handleSubmit = async (e) => {
    e.preventDefault()
    const selectedParticipantId = Array.from(selectedIds)[0] // Solo uno
    

    taskMutation.mutate({
      action: 'create',
      entity: {
        task_name: taskName,
        plan_id: planId,
        participant_id: selectedParticipantId,
        task_description: taskDescription,
        task_start_date: startDate,
        task_end_date: endDate,
      },
      apiPath: '/planning/task/create'
    },{
      onSuccess: () => {
        onTaskUpdate?.()
      }
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Crear Tarea +</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Tarea</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Nombre Tarea</label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Descripción</label>
            <input
              type="text"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Asignar participante</label>
            <ScrollAreaUsers
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
              participants={participants}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Fecha y hora de inicio</label>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Fecha y hora de fin</label>
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <Button type="submit" className="mt-2">
            Guardar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateTaskForm
