import { useEffect, useState } from "react"
import { ScrollArea } from "./ui/scroll-area"
import { Separator } from "./ui/separator"
import { Card, CardContent } from "./ui/card"
import useCrud from "@/hooks/useCrud" // ajusta la ruta si tu archivo useCrud está en otra carpeta

const ScrollAreaTasks = () => {

  const colorClasses = [
    "bg-gradient-to-r from-green-500 to-green-700",
    "bg-gradient-to-r from-purple-500 to-purple-700",
    "bg-gradient-to-r from-pink-500 to-pink-700",
    "bg-gradient-to-r from-yellow-500 to-yellow-600",
    "bg-gradient-to-r from-indigo-500 to-indigo-700",
  ];

  const { getModel } = useCrud("/planning/task")
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const allTasks = await getModel()
        const filtered = allTasks.filter((task) => {
          const now = new Date()
          const end = new Date(task.task_end_date)

          const diffTime = end.getTime() - now.getTime()
          const diffDays = diffTime / (1000 * 60 * 60 * 24)

          return diffDays >= 0 && diffDays <= 3
        })

        setTasks(filtered)
      } catch (err) {
        console.error("Error cargando tareas:", err)
      }
    }

    loadTasks()
  }, [getModel])

  return (
    <ScrollArea className="h-100 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Próximas tareas</h4>
        {tasks.length === 0 ? (
          <p className="text-sm text-gray-500">No hay tareas próximas</p>
        ) : (
          tasks.map((task,index) => (
            <div key={task.task_id}>
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
          ))
        )}
      </div>
    </ScrollArea>
  )
}

export default ScrollAreaTasks
