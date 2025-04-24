import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import ScrollAreaUsers from "./scroll-area-users";

const SimpleFormPlanning = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Crear Plan +</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Registro</DialogTitle>
                </DialogHeader>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Nombre Plan</label>
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
                        <ScrollAreaUsers className="h-30 rounded-md border"/>
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

export default SimpleFormPlanning