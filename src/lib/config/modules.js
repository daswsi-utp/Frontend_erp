import { Button } from "@/components/ui/button";
import {
  UsersRound,
  Forklift,
  BadgeDollarSign,
  BookUser,
  NotebookPen,
  LayoutDashboard,
  Calendar,
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
    path: "/crm",
    icon: BadgeDollarSign,
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
        subItems: [
          { title: "Por Asesor", path: "/crm/administrador/tracking" },
        ],
      },
      {
        title: "Lead",
        icon: Contact,
        path: "/crm/administrador/leads",
        subItems: [
          { title: "Importar Manualmente", path: "/crm/administrador/leads/import" },
          { title: "Insertar Mnualmente", path: "/crm/administrador/leads/insert" },
          { title: "Buscar Cliente", path: "/crm/administrador/leads/search" },
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

  sales: {
    name: "Ventas",
    path: "/sales",
    icon: BadgeDollarSign,
    navItems: [
      {
        title: "Gestion de Cotizaciones",
        icon: BadgeDollarSign,
        path: "/sales/quotationManagement",
        subItems: [
          { title: "Cotizaciones", path: "/sales/quotes" },
          { title: "Nueva Corización", path: "/sales/newQuote" },
          { title: "Aprobación de Cotizaciones", path: "/sales/approvalofquotations"},
        ],
      },
      
      {
        title: "Registro de Pedido de Venta",
        icon: BadgeDollarSign,
        path: "/sales/registrationrequest",
        subItems: [
          { title: "Ingresar/Procesar órdenes de clientes", path: "/sales/registrationrequest"},
          
        ],
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
  planning: {
    name: "Planning",
    path: "/planning",
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
    ]
  }
};
