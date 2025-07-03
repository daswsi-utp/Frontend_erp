import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useState } from "react"
import useCrud from "@/hooks/useCrud"
import useEntityMutation from "@/hooks/useEntityMutation";

const SimpleFormPlanning = () => {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const planningMutation = useEntityMutation('plan')

    const handleSubmit = (e) => {
        e.preventDefault()

        planningMutation.mutate({
            action: 'create',
            entity: {
            plan_name: name,
            plan_description: description,
            plan_start_date: startDate,
            plan_end_date: endDate
            },
            apiPath: '/planning/plan/create'
        })

        setName("")
        setDescription("")
        setStartDate("")
        setEndDate("")
    }


    return (
        <Dialog>
        <DialogTrigger asChild>
            <Button variant="outline">Crear Plan +</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Crear Plan</DialogTitle>
            </DialogHeader>
            <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label className="block text-sm font-medium mb-1">Nombre Plan</label>
                <input
                type="text"
                className="w-full p-2 border rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Descripción</label>
                <input
                type="text"
                className="w-full p-2 border rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Fecha Inicio</label>
                <input
                type="date"
                className="w-full p-2 border rounded"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Fecha Fin</label>
                <input
                type="date"
                className="w-full p-2 border rounded"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
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