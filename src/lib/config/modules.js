import {
  UsersRound,
  BadgeDollarSign,
  LayoutDashboard,
  Calendar,
  Contact,
  TicketsPlane,
  FileChartLine,
  FileClock,
} from "lucide-react";
import { ROLES } from '@/lib/config/roles'


export const MODULES_CONFIG = {
  rrhh: {
    name: "Recursos Humanos",
    path: "/rrhh",
    icon: UsersRound,
    allowedRoles: [ROLES.ADMIN, ROLES.ADMIN_RRHH],
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
          { title: "Registrar Asistencia", path: "/rrhh/departmentAttendance" },
        ],
      },
      {
        title: "Vacaciones y Permisos",
        icon: TicketsPlane,
        path: "/rrhh/vacations",
        subItems: [
          { title: "Registrar Vacaciones", path: "/rrhh/vacations" },
          { title: "Registrar Permisos", path: "/rrhh/permissions" },
        ],
      },
    ],
  },
  crm: {
    name: "CRM",
    path: "/crm",
    icon: BadgeDollarSign,
    allowedRoles: [
      ROLES.ADMIN,
      ROLES.ADMIN_CRM,
      ROLES.COORDINATOR_CRM,
      ROLES.ASESOR_CRM,
    ],
    navItems: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/crm",
        exact: true,
      },
      {
        title: "Seguimiento",
        icon: UsersRound,
        path: "/crm/administrador/tracking",
        allowedRoles: [
          ROLES.ADMIN,
          ROLES.ADMIN_CRM
        ],
        subItems: [
          { title: "Por Asesor", path: "/crm/administrador/tracking" },
        ],
      },
      {
        title: "Leads",
        icon: Contact,
        path: "/crm/administrador/leads",
        allowedRoles: [
          ROLES.ADMIN
        ],
        subItems: [
          {
            title: "Importar Manualmente",
            path: "/crm/administrador/leads/import",
          },
          {
            title: "Insertar Manualmente",
            path: "/crm/administrador/leads/insert",
          },
          { title: "Buscar Cliente", path: "/crm/administrador/leads/search" },
        ],
      },
      {
        title: "Gestión de Personal",
        icon: Contact,
        path: "/crm/administrador/comercials",
        allowedRoles: [
          ROLES.ADMIN
        ],
        subItems: [
          {
            title: "Ejecutivos de ventas",
            path: "/crm/administrador/comercials",
          },
          {
            title: "Coordindores de ventas",
            path: "/crm/administrador/comercials/coordinators",
          },
        ],
      },
      {
        title: "Área Comercial",
        icon: Contact,
        path: "/crm/administrador/comercials",
        allowedRoles: [
          ROLES.ADMIN
        ],
        subItems: [
          {
            title: "Ejecutivos de ventas",
            path: "/crm/administrador/comercials",
          },
          {
            title: "Coordindores de ventas",
            path: "/crm/administrador/comercials/coordinators",
          },
        ],
      },
    ],
  },

  sales: {
    name: "Ventas",
    path: "/sales",
    allowedRoles: [ROLES.ADMIN, ROLES.ADMIN_VENTAS],
    icon: BadgeDollarSign,
    navItems: [
      {
        title: "Gestion de Cotizaciones",
        icon: BadgeDollarSign,
        path: "/sales/quotes",
        subItems: [
          { title: "Cotizaciones", path: "/sales/quotes" },
          { title: "Nueva Corización", path: "/sales/newQuote" },
          {
            title: "Aprobación De Cotizaciones",
            path: "/sales/approvalofquotations",
          },
        ],
      },

      {
        title: "Registro de Pedido de Venta",
        icon: BadgeDollarSign,
        path: "/sales/registrationrequest",
        subItems: [
          {
            title: "Ingresar órdenes de clientes",
            path: "/sales/registrationrequest",
          },
          { title: "Convetir a Órden", path: "/sales/convertorders" },
          { title: "Tabla de Pedidos", path: "/sales/Tableorders" },
        ],
      },
    ],
  },

  customers: {
    name: "Logistic",
    path: "/logistic",
    allowedRoles: [ROLES.ADMIN, ROLES.ADMIN_LOGISTIC],
    icon: BadgeDollarSign,
    // navItems: [
    //   {
    //     title: "Pedidos",
    //     icon: BadgeDollarSign,
    //     path: "/sales/orders",
    //     subItems: [{ title: "Nuevo", path: "/sales/orders/new" }],
    //   },
    // ],
  },
  planning: {
    name: "Planning",
    path: "/planning",
    allowedRoles: [ROLES.ADMIN, ROLES.ADMIN_PLANNING],
    icon: BadgeDollarSign,
    navItems: [
      {
        title: "All Plannings",
        icon: LayoutDashboard,
        path: "/planning",
        exact: true,
      },
      {
        title: "Create project",
        icon: Calendar,
        path: "/planning/project",
      },
    ],
  },

  manufacture: {
    name: "Manufactura",
    path: "/manufacture",
    allowedRoles: [ROLES.ADMIN, ROLES.ADMIN_MANUFACTURE],
    icon: BadgeDollarSign,
    navItems: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/manufacture",
        exact: true,
      },

      {
        title: "Datos Maestros",
        icon: FileChartLine,
        path: "/manufacture/masterData",
        subItems: [
          {
            title: "Productos",
            path: "/manufacture/masterData/manufacturingProducts",
          },
        ],
      },

      {
        title: "Control de Fabricación",
        icon: FileClock,
        path: "/manufacture/manufactoringControl",
        subItems: [
          {
            title: "Orden de producción",
            path: "/manufacture/manufactoringControl/productionOrder",
          },
        ],
      },

      // {
      //   title: "Planificacion de la produccion",
      //   icon: CalendarClock,
      //   path: "/manufacture/productionPlanning",
      //   subItems: [
      //     { title: "MRP", path: "/manufacture/productionPlanning/MRP" },
      //   ],
      // },

      // {
      //   title: "KANBAN - Estado de la Producción",
      //   icon: BookCopy,
      //   path: "/manufacture/kanban",

      // },
    ],
  },
};
