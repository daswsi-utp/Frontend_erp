
export const ROLES = {
  ADMIN: 'ADMIN',
  ADMIN_CRM: 'ADMIN_CRM',
  COORDINATOR_CRM: 'COORDINATOR_CRM',
  ASESOR_CRM: 'ASESOR_CRM',
  ADMIN_RRHH: 'ADMIN_RRHH',
  ADMIN_LOGISTIC: 'ADMIN_LOGISTIC',
  ADMIN_VENTAS: 'ADMIN_VENTAS',
  ADMIN_MANUFACTURE: 'ADMIN_MANUFACTURE',
  ADMIN_PLANNING: 'ADMIN_PLANNING'
};


export const LEAD_TYPES = {
  POTENCIAL: "CP",
  NUEVO: "CN",
  RECICLADO: "CR",
};

export const MODULE_PERMISSIONS = {
  [ROLES.ADMIN]: {
    access: 'ALL_MODULES',
    permissions: 'FULL'
  },

  [ROLES.ADMIN_CRM]: {
    access: ['CRM'],
    permissions: {
      dashboard: true,
      tracking: true,
      leads: {
        view: 'all',
        create: true,
        edit: true,
        delete: true,
        assign: true
      },
      comercials: true,
      reports: true,
      configuration: true
    }
  },

  [ROLES.COORDINATOR_CRM]: {
    access: ['CRM'],
    permissions: {
      dashboard: true,
      tracking: true,
      leads: {
        view: 'assigned',
        create: true,
        edit: true,
        delete: false,
        assign: true
      },
      comercials: true,
      reports: true,
      configuration: false
    }
  },

  [ROLES.ASESOR_CRM]: {
    access: ['CRM'],
    permissions: {
      dashboard: true,
      tracking: false,
      leads: {
        view: 'own',
        create: true,
        edit: 'own',
        delete: false,
        assign: false
      },
      comercials: false,
      reports: false,
      configuration: false
    }
  },

};

export const getRolePermissions = (role) => {
  return MODULE_PERMISSIONS[role] || {};
};

export const getModuleFromRole = (role) => {
  if (!role || typeof role !== 'string') return null;
  if (role === ROLES.ADMIN) return null;
  return role.split('_')[1]?.toLowerCase() || null;
};
