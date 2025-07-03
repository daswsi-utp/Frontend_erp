import React, { useEffect, useState } from "react"
import { ScrollArea } from "./ui/scroll-area"
import { Checkbox } from "./ui/checkbox"
import { Separator } from "./ui/separator"
import { Card, CardContent } from "./ui/card"
import useCrud from "@/hooks/useCrud"

const ScrollAreaSelectTasks = ({ selectedTaskIds, setSelectedTaskIds, reloadTrigger, tasks }) => {
 
  const toggleSelect = (id) => {
    setSelectedTaskIds(prev => {
      const newSelected = new Set(prev)
      if (newSelected.has(id)) {
        newSelected.delete(id)
      } else {
        newSelected.add(id)
      }
      return newSelected
    })
  }

  return (
    <ScrollArea className="h-90 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Seleccione las tareas</h4>
        {tasks.map((task) => (
          <div key={`${task.task_id}-${task.task_name}`}>
            <Card>
              <CardContent className="flex gap-5 align-middle items-center">
                <Checkbox
                  id={`task-checkbox-${task.task_id}`}
                  checked={selectedTaskIds.has(task.task_id)}
                  onCheckedChange={() => toggleSelect(task.task_id)}
                />
                <div>
                  <p>Tarea: {task.task_name}</p>
                  <p>Inicio: {task.task_start_date}</p>
                  <p>Final: {task.task_end_date}</p>
                </div>
              </CardContent>
            </Card>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

export default ScrollAreaSelectTasks
