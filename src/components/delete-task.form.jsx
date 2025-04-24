import ScrollAreaSelectTasks from "./scroll-area-SelectTasks"
import { Button } from "./shared/button"
import { Dialog, DialogTrigger, DialogHeader, DialogTitle, DialogContent } from "./ui/dialog"

const DeleteTaskForm = () => {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Eliminar Tarea +</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Eliminar Tarea</DialogTitle>
                </DialogHeader>
                <form className="space-y-4">
                    <div>
                        <ScrollAreaSelectTasks></ScrollAreaSelectTasks>
                    </div>
                    <Button type="submit" className="mt-2">
                        Eliminar
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )

}

export default DeleteTaskForm