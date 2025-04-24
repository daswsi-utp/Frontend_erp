import { ScrollArea } from "./ui/scroll-area"
import { Checkbox } from "./ui/checkbox"
import { Separator } from "./ui/separator"
import { Card, CardContent } from "./ui/card"

const ScrollAreaSelectTasks = () => {

    const tasks = [
        {
            id: '1',
            title: 'wasd',
            start: '2025-04-23 02:30',
            end: '2025-04-23 05:00'
        },
        {
            id: '2',
            title: 'tukituki',
            start: '2025-04-21 06:00',
            end: '2025-04-21 08:00'
        },
        {
            id: '3',
            title: 'wwww',
            start: '2025-04-24 04:00',
            end: '2025-04-24 08:00'
        }
    ]

    return (
        <ScrollArea className="h-90 rounded-md border">
            <div className="p-4">
                <h4 className="mb-4 text-sm font-medium leading-none">Seleccione las tareas</h4>
                {tasks.map((task) => (
                    <div key={task.id}>
                        <Card>
                            <CardContent className="flex gap-5 align-middle items-center">
                                <div>
                                    <Checkbox id={task.id} className="bg-black"/>
                                </div>
                                <div>
                                    <p>Tarea: {task.title}</p>
                                    <p>Inicio: {task.start}</p>
                                    <p>Final: {task.end}</p>
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