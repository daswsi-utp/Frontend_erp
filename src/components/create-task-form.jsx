import ScrollAreaUsers from "./scroll-area-users"
import { Button } from "./shared/button"
import { Dialog, DialogTrigger, DialogHeader, DialogTitle, DialogContent } from "./ui/dialog"

const CreateTaskForm = () => {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Crear Tarea +</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Crear Tarea</DialogTitle>
                </DialogHeader>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Nombre Tarea</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Descripcion</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Agrega empleados</label>
                        <ScrollAreaUsers />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Fecha Inicio</label>
                        <input
                            type="date"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Fecha Fin</label>
                        <input
                            type="date"
                            className="w-full p-2 border rounded"
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