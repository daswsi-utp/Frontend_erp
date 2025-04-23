import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

const CreateParticipant = () => {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Crear Participante +</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Crear Participante</DialogTitle>
                </DialogHeader>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Nombre Participante</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Correo</label>
                        <input
                            type="email"
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

export default CreateParticipant