export const ROLES = {
  ADMIN: "admin",
  CRM_ADMIN: "crm_admin",
  CRM_ASESOR: "crm_asesor",
};

export const LEAD_TYPES = {
  POTENCIAL: "CP",
  NUEVO: "CN",
  RECICLADO: "CR",
};

export const CRM_PERMISSIONS = {
  [ROLES.CRM_ADMIN]: {
    sidebar: ["dashboard", "seguimiento", "leads", "reportes", "configuracion"],
    leads: {
      view: "all",
      create: true,
      assign: true,
      edit: true,
      delete: true,
    },
  },
  [ROLES.CRM_ASESOR]: {
    sidebar: ["dashboard", "mis_leads"],
    leads: {
      view: "own",
      create: true,
      assign: false,
      edit: "own",
      delete: false,
    },
  },
};
