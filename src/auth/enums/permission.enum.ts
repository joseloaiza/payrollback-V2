export enum Permission {
  // Companies
  COMPANIES_CREATE = 'companies:create',
  COMPANIES_READ = 'companies:read',
  COMPANIES_UPDATE = 'companies:update',
  COMPANIES_DELETE = 'companies:delete',
  COMPANIES_MANAGE = 'companies:manage',

  // Employees
  EMPLOYEES_CREATE = 'employees:create',
  EMPLOYEES_READ = 'employees:read',
  EMPLOYEES_UPDATE = 'employees:update',
  EMPLOYEES_DELETE = 'employees:delete',
  EMPLOYEES_READ_SENSITIVE = 'employees:read-sensitive',

  // Payroll
  PAYROLL_READ = 'payroll:read',
  PAYROLL_PROCESS = 'payroll:process',
  PAYROLL_APPROVE = 'payroll:approve',
  PAYROLL_DELETE = 'payroll:delete',
  PAYROLL_MANAGE_CONCEPTS = 'payroll:manage-concepts',
  PAYROLL_MANAGE_PERIODS = 'payroll:manage-periods',

  // Novelties
  NOVELTIES_CREATE = 'novelties:create',
  NOVELTIES_READ = 'novelties:read',
  NOVELTIES_UPDATE = 'novelties:update',
  NOVELTIES_DELETE = 'novelties:delete',
  NOVELTIES_MANAGE_VACATIONS = 'novelties:manage-vacations',
  NOVELTIES_MANAGE_ABSENTEEISM = 'novelties:manage-absenteeism',

  // Social Security
  SOCIAL_SECURITY_READ = 'social-security:read',
  SOCIAL_SECURITY_MANAGE = 'social-security:manage',

  // Exports
  EXPORTS_READ = 'exports:read',
  EXPORTS_GENERATE = 'exports:generate',

  // Users
  USERS_CREATE = 'users:create',
  USERS_READ = 'users:read',
  USERS_UPDATE = 'users:update',
  USERS_DELETE = 'users:delete',
  USERS_MANAGE_ROLES = 'users:manage-roles',

  // Shared / Reference data
  SHARED_READ = 'shared:read',
  SHARED_MANAGE = 'shared:manage',

  // Reports
  REPORTS_READ = 'reports:read',
  REPORTS_GENERATE = 'reports:generate',

  // Audit
  AUDIT_READ = 'audit:read',
}
