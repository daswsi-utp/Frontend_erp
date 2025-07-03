import { useEffect, useState } from "react"
import { ScrollArea } from "./ui/scroll-area"
import { Separator } from "./ui/separator"
import { Card, CardContent } from "./ui/card"

const ScrollAreaTasks = ({ tasks = [] }) => {

  const colorClasses = [
    "bg-gradient-to-r from-green-500 to-green-700",
    "bg-gradient-to-r from-purple-500 to-purple-700",
    "bg-gradient-to-r from-pink-500 to-pink-700",
    "bg-gradient-to-r from-yellow-500 to-yellow-600",
    "bg-gradient-to-r from-indigo-500 to-indigo-700",
  ];

  return (
    <ScrollArea className="h-100 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Próximas tareas</h4>
        {tasks.length === 0 ? (
          <p className="text-sm text-gray-500">No hay tareas próximas</p>
        ) : (
          tasks.map((task, index) => {
  const key = task.task_id || `temp-${index}` // fallback temporal
  return (
    <div key={key}>
      <Card
        className={`text-white hover:scale-105 transition shadow-md 
                    ${colorClasses[index % colorClasses.length]}`}
      >
        <CardContent className="flex flex-col gap-2">
          <p><strong>Tarea:</strong> {task.task_name}</p>
          <p><strong>Inicio:</strong> {task.task_start_date}</p>
          <p><strong>Final:</strong> {task.task_end_date}</p>
        </CardContent>
      </Card>
      <Separator className="my-2" />
    </div>
  )
})
        )}
      </div>
    </ScrollArea>
  )
}

export default ScrollAreaTasks
