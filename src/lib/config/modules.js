import {
  UsersRound,
  Forklift,
  BadgeDollarSign,
  BookUser,
  NotebookPen,
  LayoutDashboard,
  Contact,
  TicketsPlane,
} from "lucide-react";

export const MODULES_CONFIG = {
  rrhh: {
    name: "Recursos Humanos",
    path: "/rrhh",
    icon: UsersRound,
    navItems: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/rrhh",
        exact: true,
      },
      {
        title: "Gestión de Empleados",
        icon: UsersRound,
        path: "/rrhh/employees",
        subItems: [
          { title: "Empleados", path: "/rrhh/employees" },
          { title: "Contratos", path: "/rrhh/contrats" },
          { title: "Cargos y Departamentos", path: "/rrhh/departments" },
        ],
      },
      {
        title: "Asistencia",
        icon: Contact,
        path: "/rrhh/attendance",
        subItems: [
          { title: "Justificar Inasistencia", path: "/rrhh/justifyAttendance" },
          { title: "Reportes de Asistencia", path: "/rrhh/attendanceReports" },
        ],
      },
      {
        title: "Vacaciones y Permisos",
        icon: TicketsPlane,
        path: "/rrhh/vacations",
        subItems: [
          { title: "Registrar Vacaciones", path: "/rrhh/vacations" },
          { title: "Saldo de Vacaciones", path: "/rrhh/vacationsBalance" },
          { title: "Registrar permisos", path: "/rrhh/permissions" },
        ],
      },
    ],
  },
  customers: {
    name: "Clientes",
    path: "/customers",
    icon: BadgeDollarSign,
    navItems: [
      {
        title: "Pedidos",
        icon: BadgeDollarSign,
        path: "/sales/orders",
        subItems: [{ title: "Nuevo", path: "/sales/orders/new" }],
      },
    ],
  },
  crm: {
    name: "CRM",
    path: "/crmj",
    icon: BadgeDollarSign,
    navItems: [
      {
        title: "pruebas",
        icon: BadgeDollarSign,
        path: "/crm/dashboard",
        subItems: [
          { title: "Nuevo", path: "/crm/orders/new" },
          { title: "Nuevo", path: "/crm/orders/new" },
          { title: "Nuevo", path: "/crm/orders/new" },
          { title: "Nuevo", path: "/sales/orders/new" },
          { title: "Nuevo", path: "/sales/orders/new" },
        ],
      },
    ],
  },

  sales: {
    name: "Ventas",
    path: "/sales",
    icon: BadgeDollarSign,
    navItems: [
      {
        title: "Cotizaciones",
        icon: BadgeDollarSign,
        path: "/sales/orders",
        subItems: [{ title: "Nueva Corización", path: "/sales/orders/new" }],
      },
    ],
  },

  customers: {
    name: "Logistic",
    path: "/logistics",
    icon: BadgeDollarSign,
    navItems: [
      {
        title: "Pedidos",
        icon: BadgeDollarSign,
        path: "/sales/orders",
        subItems: [{ title: "Nuevo", path: "/sales/orders/new" }],
      },
    ],
  },
};
