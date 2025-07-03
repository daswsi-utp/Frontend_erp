import {
  UsersRound,
  BadgeDollarSign,
  LayoutDashboard,
  Calendar,
  Contact,
  TicketsPlane,
  FileChartLine,
  FileClock,
  Mails,
  PackageSearch,
} from "lucide-react";
import { ROLES } from '@/lib/config/roles'


export const MODULES_CONFIG = {
  rrhh: {
    name: "RRHH",
    path: "/rrhh/employees",
    icon: UsersRound,
    allowedRoles: [ROLES.ADMIN, ROLES.ADMIN_RRHH],
    navItems: [
      {
        title: "Gestión de Empleados",
        icon: UsersRound,
        path: "/rrhh/employees",
        subItems: [
          { title: "Empleados", path: "/rrhh/employees" },
          { title: "Contratos", path: "/rrhh/contrats" },
          { title: "Departamentos", path: "/rrhh/departments" },
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
        path: "/crm/administrador/teams",
        allowedRoles: [
          ROLES.ADMIN
        ],
        subItems: [
          {
            title: "Equipo Comercial",
            path: "/crm/administrador/teams",
          },
          {
            title: "Productos",
            path: "/crm/administrador/teams/products",
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

        ],
      },

      {
        title: "Registro de Pedido de Venta",
        icon: BadgeDollarSign,
        path: "/sales/registrationrequest",
        subItems: [
          { title: "Pedidos", path: "/sales/convertorders"},

        ],
      },

    ],
  },

  logistic: {
    name: "Logistic",
    path: "/logistic/product",
    allowedRoles: [ROLES.ADMIN, ROLES.ADMIN_LOGISTIC],
    icon: BadgeDollarSign,
    navItems: [
      {
        title: "Gestion de Productos",
        icon: PackageSearch,
        path: "/logistic/product",
        subItems: [
          { title: "Productos", path: "/logistic/product" },

        ],
      },

    ],
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
    name: "Noticias",
    path: "/manufacture/mail/send",
    allowedRoles: [ROLES.ADMIN, ROLES.ADMIN_MANUFACTURE],
    icon: Mails,
    navItems: [
      {
        title: "Enviar Correo",
        icon: FileChartLine,
        path: "/manufacture",
        subItems: [
          {
            title: "Send",
            path: "/manufacture/mail/send",
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
