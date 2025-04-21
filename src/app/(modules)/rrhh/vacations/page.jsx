import VacationsTable from "@/modules/rrhh/vacations/tables/VacationsTable";

const vacations = [
  {
    id: 1,
    employee: {
      id: 2,
      firstName: "Daniel",
      lastName: "Cabrera"
    },
    startDate: '2025-04-21',
    endDate: '2026-04-21',
    daysTaken: '70',
    status: 'APROVADO',
    requestedAt: '2004-10-20'
  },
  {
    id: 2,
    employee: {
      id: 2,
      firstName: "Daniel",
      lastName: "Cabrera"
    },
    startDate: '2026-04-21',
    endDate: '2027-04-21',
    daysTaken: '70',
    status: 'PENDIENTE',
    requestedAt: '2025-04-20'
  },
  {
    id: 3,
    employee: {
      id: 2,
      firstName: "Daniel",
      lastName: "Cabrera"
    },
    startDate: '2027-04-21',
    endDate: '2028-04-21',
    daysTaken: '70',
    status: 'DESAPROVADO',
    requestedAt: '2004-10-20'
  }
];

const Vacations = () => {
    return (
      <>
        <div className="w-full flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">Vacaciones Registradas</h1>
        </div>
        <VacationsTable
          vacations={vacations}
        />
      </>
    );
};
  
export default Vacations;