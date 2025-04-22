import { SimpleDropDown } from "@/components/simple-dropdown";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Planning = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Plannings</h1>
            
            <div className="flex flex-wrap gap-4">
                <Card className="p-4 w-[32%]">
                    <CardTitle className="flex justify-between item">
                        <h1>Proyecto 1</h1>
                        <SimpleDropDown/>
                    </CardTitle>
                    <CardDescription>
                        <p>El siguiente proyecto es para realizar 1 erp con 6 modulos utilizando next en front y spring en el back</p>
                        <Separator className="mb-4 mt-4"></Separator>
                        <p>Fecha inicio: </p>
                        <p>Fecha Fin: </p>
                    </CardDescription>
                </Card>
                <Card className="p-4 w-[32%] h-40%">
                    <CardTitle className="flex justify-between item">
                        <h1>Horario eventos royal candy</h1>
                        <SimpleDropDown/>
                    </CardTitle>
                    <CardDescription>
                        <p>Aqui se definiran los dias que habran evento, el tipo de evento y en que horario deben asistir los diferentes trabajadores</p>
                        <Separator className="mb-4 mt-4"></Separator>
                        <p>Fecha inicio: </p>
                        <p>Fecha Fin: </p>
                    </CardDescription>
                </Card>
                <Card className="p-4 w-[32%]">
                    <CardTitle className="flex justify-between item">
                        <h1>Semana santa</h1>
                        <SimpleDropDown/>
                    </CardTitle>
                    <CardDescription>
                        <p>Eventos que se van a realizar en la proxima semana</p>
                        <Separator className="mb-4 mt-4"></Separator>
                        <p>Fecha inicio: </p>
                        <p>Fecha Fin: </p>
                    </CardDescription>
                </Card>
                <Card className="p-4 w-[32%] h-40%">
                    <CardTitle className="flex justify-between item">
                        <h1>Planeacion entrenamiento abril 2025</h1>
                        <SimpleDropDown/>
                    </CardTitle>
                    <CardDescription>
                        <p>Aqui se definira los horarios de los profesores de las diferente artes marciles de nuestra academia</p>
                        <Separator className="mb-4 mt-4"></Separator>
                        <p>Fecha inicio: </p>
                        <p>Fecha Fin: </p>
                    </CardDescription>
                </Card>
                
            </div>

        </div>
    );
}

export default Planning;