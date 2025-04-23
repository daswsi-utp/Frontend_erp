import { SimpleDropDown } from "@/components/simple-dropdown";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Planning = () => {

    const proyectos = [
  {
    titulo: "Proyecto 1",
    descripcion: "El siguiente proyecto es para realizar 1 erp con 6 modulos utilizando next en front y spring en el back",
    fechaInicio: "",
    fechaFin: ""
  },
  {
    titulo: "Horario eventos royal candy",
    descripcion: "Aqui se definiran los dias que habran evento, el tipo de evento y en que horario deben asistir los diferentes trabajadores",
    fechaInicio: "",
    fechaFin: ""
  },
  {
    titulo: "Semana santa",
    descripcion: "Eventos que se van a realizar en la proxima semana",
    fechaInicio: "",
    fechaFin: ""
  },
  {
    titulo: "Planeacion entrenamiento abril 2025",
    descripcion: "Aqui se definira los horarios de los profesores de las diferente artes marciles de nuestra academia",
    fechaInicio: "",
    fechaFin: ""
  }
];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Plannings</h1>
                <div className="flex flex-wrap gap-4">
                {proyectos.map((proyecto, index) => (
                    <Card key={index} className="p-4 w-[32%] h-40%">
                    <CardTitle className="flex justify-between item">
                        <h1>{proyecto.titulo}</h1>
                        <SimpleDropDown/>
                    </CardTitle>
                    <CardDescription>
                        <p>{proyecto.descripcion}</p>
                        <Separator className="mb-4 mt-4"></Separator>
                        <p>Fecha inicio: {proyecto.fechaInicio}</p>
                        <p>Fecha Fin: {proyecto.fechaFin}</p>
                    </CardDescription>
                    </Card>
                ))}
                </div>
        </div>
    );
}

export default Planning;