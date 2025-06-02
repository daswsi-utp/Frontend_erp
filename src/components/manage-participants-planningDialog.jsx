import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import CreateParticipant from "./form-create-par"
import AddParticipant from "./form-add-par"
import DeleteParticipant from "./form-delete-par"

const ManageParticipants = () => {
    return (

        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Manejo Participantes</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Manejo Participantes</DialogTitle>
                </DialogHeader>
                <CreateParticipant></CreateParticipant>
                <DeleteParticipant></DeleteParticipant>
            </DialogContent>
        </Dialog>


    )
}

export default ManageParticipants