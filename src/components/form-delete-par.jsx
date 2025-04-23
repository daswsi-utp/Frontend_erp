import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTrigger,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import ScrollAreaUsers from "./scroll-area-users";

const DeleteParticipant = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Eliminar Participante -</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Eliminar Participante</DialogTitle>
                </DialogHeader>
                <form className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <label className="block text-sm font-medium mb-1">Selecciona</label>
                        <ScrollAreaUsers className="h-40 rounded-md border" />
                    </div>
                    <Button> Eliminar</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteParticipant