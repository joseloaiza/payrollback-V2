import { MigrationInterface, QueryRunner } from 'typeorm';

// Stable UUIDs — do NOT change after first run in any environment
const ROLES = [
  {
    id: 'a1b2c3d4-0001-4000-8000-000000000001',
    name: 'SUPER_ADMIN',
    description: 'Acceso total al sistema',
  },
  {
    id: 'a1b2c3d4-0002-4000-8000-000000000002',
    name: 'COMPANY_ADMIN',
    description: 'Acceso completo dentro de su empresa',
  },
  {
    id: 'a1b2c3d4-0003-4000-8000-000000000003',
    name: 'HR_MANAGER',
    description: 'Gestión de empleados, contratos y novedades',
  },
  {
    id: 'a1b2c3d4-0004-4000-8000-000000000004',
    name: 'PAYROLL_PROCESSOR',
    description: 'Procesamiento de nómina y períodos',
  },
  {
    id: 'a1b2c3d4-0005-4000-8000-000000000005',
    name: 'ACCOUNTANT',
    description: 'Lectura de nómina, reportes y exportaciones',
  },
  {
    id: 'a1b2c3d4-0006-4000-8000-000000000006',
    name: 'VIEWER',
    description: 'Acceso de solo lectura básico',
  },
];

const PERMISSIONS = [
  // Companies
  { id: 'b0000001-0001-4000-8000-000000000001', name: 'companies:create', resource: 'companies', action: 'create' },
  { id: 'b0000001-0002-4000-8000-000000000002', name: 'companies:read', resource: 'companies', action: 'read' },
  { id: 'b0000001-0003-4000-8000-000000000003', name: 'companies:update', resource: 'companies', action: 'update' },
  { id: 'b0000001-0004-4000-8000-000000000004', name: 'companies:delete', resource: 'companies', action: 'delete' },
  { id: 'b0000001-0005-4000-8000-000000000005', name: 'companies:manage', resource: 'companies', action: 'manage' },
  // Employees
  { id: 'b0000002-0001-4000-8000-000000000001', name: 'employees:create', resource: 'employees', action: 'create' },
  { id: 'b0000002-0002-4000-8000-000000000002', name: 'employees:read', resource: 'employees', action: 'read' },
  { id: 'b0000002-0003-4000-8000-000000000003', name: 'employees:update', resource: 'employees', action: 'update' },
  { id: 'b0000002-0004-4000-8000-000000000004', name: 'employees:delete', resource: 'employees', action: 'delete' },
  { id: 'b0000002-0005-4000-8000-000000000005', name: 'employees:read-sensitive', resource: 'employees', action: 'read-sensitive' },
  // Payroll
  { id: 'b0000003-0001-4000-8000-000000000001', name: 'payroll:read', resource: 'payroll', action: 'read' },
  { id: 'b0000003-0002-4000-8000-000000000002', name: 'payroll:process', resource: 'payroll', action: 'process' },
  { id: 'b0000003-0003-4000-8000-000000000003', name: 'payroll:approve', resource: 'payroll', action: 'approve' },
  { id: 'b0000003-0004-4000-8000-000000000004', name: 'payroll:delete', resource: 'payroll', action: 'delete' },
  { id: 'b0000003-0005-4000-8000-000000000005', name: 'payroll:manage-concepts', resource: 'payroll', action: 'manage-concepts' },
  { id: 'b0000003-0006-4000-8000-000000000006', name: 'payroll:manage-periods', resource: 'payroll', action: 'manage-periods' },
  // Novelties
  { id: 'b0000004-0001-4000-8000-000000000001', name: 'novelties:create', resource: 'novelties', action: 'create' },
  { id: 'b0000004-0002-4000-8000-000000000002', name: 'novelties:read', resource: 'novelties', action: 'read' },
  { id: 'b0000004-0003-4000-8000-000000000003', name: 'novelties:update', resource: 'novelties', action: 'update' },
  { id: 'b0000004-0004-4000-8000-000000000004', name: 'novelties:delete', resource: 'novelties', action: 'delete' },
  { id: 'b0000004-0005-4000-8000-000000000005', name: 'novelties:manage-vacations', resource: 'novelties', action: 'manage-vacations' },
  { id: 'b0000004-0006-4000-8000-000000000006', name: 'novelties:manage-absenteeism', resource: 'novelties', action: 'manage-absenteeism' },
  // Social Security
  { id: 'b0000005-0001-4000-8000-000000000001', name: 'social-security:read', resource: 'social-security', action: 'read' },
  { id: 'b0000005-0002-4000-8000-000000000002', name: 'social-security:manage', resource: 'social-security', action: 'manage' },
  // Exports
  { id: 'b0000006-0001-4000-8000-000000000001', name: 'exports:read', resource: 'exports', action: 'read' },
  { id: 'b0000006-0002-4000-8000-000000000002', name: 'exports:generate', resource: 'exports', action: 'generate' },
  // Users
  { id: 'b0000007-0001-4000-8000-000000000001', name: 'users:create', resource: 'users', action: 'create' },
  { id: 'b0000007-0002-4000-8000-000000000002', name: 'users:read', resource: 'users', action: 'read' },
  { id: 'b0000007-0003-4000-8000-000000000003', name: 'users:update', resource: 'users', action: 'update' },
  { id: 'b0000007-0004-4000-8000-000000000004', name: 'users:delete', resource: 'users', action: 'delete' },
  { id: 'b0000007-0005-4000-8000-000000000005', name: 'users:manage-roles', resource: 'users', action: 'manage-roles' },
  // Shared
  { id: 'b0000008-0001-4000-8000-000000000001', name: 'shared:read', resource: 'shared', action: 'read' },
  { id: 'b0000008-0002-4000-8000-000000000002', name: 'shared:manage', resource: 'shared', action: 'manage' },
  // Reports
  { id: 'b0000009-0001-4000-8000-000000000001', name: 'reports:read', resource: 'reports', action: 'read' },
  { id: 'b0000009-0002-4000-8000-000000000002', name: 'reports:generate', resource: 'reports', action: 'generate' },
  // Audit
  { id: 'b0000010-0001-4000-8000-000000000001', name: 'audit:read', resource: 'audit', action: 'read' },
];

// role_id → permission_ids mapping
const SUPER_ADMIN_ID = 'a1b2c3d4-0001-4000-8000-000000000001';
const COMPANY_ADMIN_ID = 'a1b2c3d4-0002-4000-8000-000000000002';
const HR_MANAGER_ID = 'a1b2c3d4-0003-4000-8000-000000000003';
const PAYROLL_PROCESSOR_ID = 'a1b2c3d4-0004-4000-8000-000000000004';
const ACCOUNTANT_ID = 'a1b2c3d4-0005-4000-8000-000000000005';
const VIEWER_ID = 'a1b2c3d4-0006-4000-8000-000000000006';

const ALL_PERM_IDS = PERMISSIONS.map((p) => p.id);

const byName = (name: string) =>
  PERMISSIONS.find((p) => p.name === name)?.id ?? '';

const ROLE_PERMISSIONS: { role_id: string; permission_id: string }[] = [
  // SUPER_ADMIN — all permissions
  ...ALL_PERM_IDS.map((pid) => ({ role_id: SUPER_ADMIN_ID, permission_id: pid })),

  // COMPANY_ADMIN
  ...[
    'companies:read', 'companies:update', 'companies:manage',
    'employees:create', 'employees:read', 'employees:update', 'employees:delete', 'employees:read-sensitive',
    'payroll:read', 'payroll:process', 'payroll:approve', 'payroll:manage-concepts', 'payroll:manage-periods',
    'novelties:create', 'novelties:read', 'novelties:update', 'novelties:delete', 'novelties:manage-vacations', 'novelties:manage-absenteeism',
    'social-security:read', 'social-security:manage',
    'exports:read', 'exports:generate',
    'users:create', 'users:read', 'users:update',
    'shared:read', 'shared:manage',
    'reports:read', 'reports:generate',
    'audit:read',
  ].map((n) => ({ role_id: COMPANY_ADMIN_ID, permission_id: byName(n) })),

  // HR_MANAGER
  ...[
    'companies:read',
    'employees:create', 'employees:read', 'employees:update', 'employees:delete', 'employees:read-sensitive',
    'payroll:read',
    'novelties:create', 'novelties:read', 'novelties:update', 'novelties:delete', 'novelties:manage-vacations', 'novelties:manage-absenteeism',
    'social-security:read',
    'exports:read',
    'shared:read',
    'reports:read', 'reports:generate',
  ].map((n) => ({ role_id: HR_MANAGER_ID, permission_id: byName(n) })),

  // PAYROLL_PROCESSOR
  ...[
    'companies:read',
    'employees:read', 'employees:read-sensitive',
    'payroll:read', 'payroll:process', 'payroll:manage-concepts', 'payroll:manage-periods',
    'novelties:read',
    'social-security:read',
    'exports:read', 'exports:generate',
    'shared:read',
    'reports:read', 'reports:generate',
  ].map((n) => ({ role_id: PAYROLL_PROCESSOR_ID, permission_id: byName(n) })),

  // ACCOUNTANT
  ...[
    'companies:read',
    'employees:read',
    'payroll:read',
    'novelties:read',
    'social-security:read',
    'exports:read', 'exports:generate',
    'shared:read',
    'reports:read', 'reports:generate',
  ].map((n) => ({ role_id: ACCOUNTANT_ID, permission_id: byName(n) })),

  // VIEWER
  ...[
    'companies:read',
    'employees:read',
    'shared:read',
  ].map((n) => ({ role_id: VIEWER_ID, permission_id: byName(n) })),
];

export class SeedRolesAndPermissions1746490004000 implements MigrationInterface {
  name = 'SeedRolesAndPermissions1746490004000';

  async up(queryRunner: QueryRunner): Promise<void> {
    // Roles
    for (const role of ROLES) {
      await queryRunner.query(
        `INSERT INTO "roles" ("id", "name", "description") VALUES ($1, $2, $3)
         ON CONFLICT ("id") DO NOTHING`,
        [role.id, role.name, role.description],
      );
    }

    // Permissions
    for (const perm of PERMISSIONS) {
      await queryRunner.query(
        `INSERT INTO "permissions" ("id", "name", "resource", "action") VALUES ($1, $2, $3, $4)
         ON CONFLICT ("id") DO NOTHING`,
        [perm.id, perm.name, perm.resource, perm.action],
      );
    }

    // Role → Permission mappings
    for (const rp of ROLE_PERMISSIONS) {
      if (!rp.permission_id) continue;
      await queryRunner.query(
        `INSERT INTO "role_permissions" ("role_id", "permission_id") VALUES ($1, $2)
         ON CONFLICT DO NOTHING`,
        [rp.role_id, rp.permission_id],
      );
    }
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "role_permissions"`);
    await queryRunner.query(`DELETE FROM "permissions"`);
    await queryRunner.query(`DELETE FROM "roles"`);
  }
}
