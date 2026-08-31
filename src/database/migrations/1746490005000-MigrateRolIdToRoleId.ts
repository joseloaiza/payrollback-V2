import { MigrationInterface, QueryRunner } from 'typeorm';

const COMPANY_ADMIN_ID = 'a1b2c3d4-0002-4000-8000-000000000002';

export class MigrateRolIdToRoleId1746490005000 implements MigrationInterface {
  name = 'MigrateRolIdToRoleId1746490005000';

  async up(queryRunner: QueryRunner): Promise<void> {
    // Assign COMPANY_ADMIN to any user that had a non-null rol_id
    await queryRunner.query(
      `UPDATE "users"
       SET "role_id" = $1
       WHERE "rol_id" IS NOT NULL AND "role_id" IS NULL`,
      [COMPANY_ADMIN_ID],
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE "users" SET "role_id" = NULL WHERE "role_id" = $1`,
      [COMPANY_ADMIN_ID],
    );
  }
}
