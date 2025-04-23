import { ScrollArea } from "./ui/scroll-area"
import { Checkbox } from "./ui/checkbox"
import { Separator } from "./ui/separator"

const ScrollAreaUsers = () => {

    const empleados = [
        {
            id: 1,
            nombre: "Juan Perez",
        },
        {
            id: 2,
            nombre: "Pinwino volador",
        },
        {
            id: 3,
            nombre: "Freddy Hurtado",
        },
        {
            id: 4,
            nombre: "pinwino2",
        },
        {
            id: 5,
            nombre: "pinwino chambeador",
        },
        {
            id: 6,
            nombre: "pinwino vago",
        },
        {
            id: 7,
            nombre: "pinwino experto en redes",
        }
        ,
        {
            id: 8,
            nombre: "Pinwino gnomo de ironforge",
        }
    ]

    return (
        <ScrollArea className="h-55 rounded-md border">
            <div className="p-4">
                <h4 className="mb-4 text-sm font-medium leading-none">Empleados</h4>
                {empleados.map((empleado) => (
                    <div key={empleado.id}>
                        <div className="flex gap-2" >
                            <Checkbox id={empleado.id} />
                            <label
                                htmlFor={empleado.id}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {empleado.nombre}
                            </label>
                        </div>
                        <Separator className="my-2" />
                    </div>
                ))}
            </div>
        </ScrollArea>
    )
}

export default ScrollAreaUsers