import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import ScrollAreaUsers from "./scroll-area-users";

const AddParticipant = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Agregar Participante +</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Agregar Participante</DialogTitle>
                </DialogHeader>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Agrega empleados</label>
                        <ScrollAreaUsers className="h-40 rounded-md border"/>
                    </div>
                    <Button type="submit" className="mt-2">
                        Guardar
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddParticipant