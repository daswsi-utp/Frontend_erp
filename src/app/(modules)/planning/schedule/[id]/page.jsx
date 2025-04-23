import React from "react";

const Schedule = ({ params }) => {
    const { id } = React.use(params)

    const planningData = {
        "1": {
            name: "Proyecto 1",
            description: "ERP con 6 módulos usando Next.js y Spring",
            dates: "01/06/2024 - 30/11/2024"
        },
        "2": {
            name: "Horario eventos royal candy",
            description: "Gestión de horarios para trabajadores",
            dates: "15/05/2024 - 20/12/2024"
        },
        "3": {
            name: "wadwadawdadwa",
            description: "GSoy el 3",
            dates: "15/05/2024 - 20/12/2024"
        },
        "4": {
            name: "wiwiwiwiwi",
            description: "yo soy el 4",
            dates: "15/05/2024 - 20/12/2040"
        }
    };

    const planning = planningData[id] || {
        name: "Planeación no encontrada",
        description: "La planeación solicitada no existe",
        dates: "N/A"
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">{planning.name}</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-700 mb-4">{planning.description}</p>
                <p className="text-gray-500">Periodo: {planning.dates}</p>
                <p className="mt-4 text-sm text-gray-400">ID: {id}</p>
            </div>
        </div>
    );
}

export default Schedule