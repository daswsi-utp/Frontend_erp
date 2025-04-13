import {
  UsersRound,
  Forklift,
  BadgeDollarSign,
  BookUser,
  NotebookPen,
  LayoutDashboard,
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
        title: "Empleados",
        icon: UsersRound,
        path: "/rrhh/employees",
        subItems: [
          { title: "Nuevo", path: "/rrhh/employees/new" },
          { title: "Listado", path: "/rrhh/employees" },
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
        title: "pruebsa",
        icon: BadgeDollarSign,
        path: "/sales/orders",
        subItems: [{ title: "Nuevo", path: "/sales/orders/new" }],
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
