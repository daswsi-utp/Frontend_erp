"use client"

import { SimpleDropDown } from "@/components/simple-dropdown";
import SimpleFormPlanning from "@/components/simple-form-planning";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from 'next/navigation'


const Planning = () => {
  const router = useRouter();

  const proyectos = [
    {
      id: 1,
      titulo: "Proyecto 1",
      descripcion: "El siguiente proyecto es para realizar 1 erp con 6 modulos utilizando next en front y spring en el back",
      fechaInicio: "01/06/2024",
      fechaFin: "30/11/2024",
      color: 'bg-gradient-to-r from-blue-500 to-blue-700'
    },
    {
      id: 2,
      titulo: "Horario eventos royal candy",
      descripcion: "Aqui se definiran los dias que habran evento, el tipo de evento y en que horario deben asistir los diferentes trabajadores",
      fechaInicio: "15/05/2024",
      fechaFin: "20/12/2024",
      color: 'bg-gradient-to-r from-purple-500 to-purple-700'
    },
    {
      id: 3,
      titulo: "Semana santa",
      descripcion: "Eventos que se van a realizar en la proxima semana",
      fechaInicio: "28/03/2024",
      fechaFin: "04/04/2024",
      color: 'bg-gradient-to-r from-green-500 to-green-700'
    },
    {
      id: 4,
      titulo: "Planeacion entrenamiento abril 2025",
      descripcion: "Aqui se definira los horarios de los profesores de las diferente artes marciles de nuestra academia",
      fechaInicio: "01/04/2025",
      fechaFin: "30/04/2025",
      color: 'bg-gradient-to-r from-amber-500 to-amber-700'
    }
  ];

  const handleCardClick = (id) => {
    router.push(`/planning/schedule/${id}`);
  };

  return (
    <div className="p-6">
      <div className="flex gap-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Plannings</h1>
        <SimpleFormPlanning />
      </div>
      <div className="flex flex-wrap gap-6">
        {proyectos.map((proyecto) => (
          <Card
            key={proyecto.id}
            className={`p-6 w-full sm:w-[48%] lg:w-[31%] h-auto rounded-xl shadow-md transition-all duration-300 
                         hover:scale-105 hover:shadow-lg cursor-pointer group ${proyecto.color} text-white`}
            onClick={() => handleCardClick(proyecto.id)}
          >
            <CardTitle className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-semibold group-hover:text-white">{proyecto.titulo}</h1>
              <div onClick={(e) => e.stopPropagation()}>
                <SimpleDropDown />
              </div>
            </CardTitle>
            <CardDescription className="text-white/90">
              <p className="mb-4">{proyecto.descripcion}</p>
              <Separator className="mb-4 bg-white/20" />
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <span className="font-medium">Fecha inicio:</span>
                  <span>{proyecto.fechaInicio}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">Fecha Fin:</span>
                  <span>{proyecto.fechaFin}</span>
                </p>
              </div>
            </CardDescription>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Planning;