import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoleIdToUsers1746490001000 implements MigrationInterface {
  name = 'AddRoleIdToUsers1746490001000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users"
        ADD COLUMN "role_id" UUID NULL,
        ADD CONSTRAINT "FK_users_role"
          FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE SET NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "userCompany"
        ADD COLUMN "role_id" UUID NULL,
        ADD CONSTRAINT "FK_userCompany_role"
          FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE SET NULL
    `);

    await queryRunner.query(
      `CREATE INDEX "idx_users_role_id" ON "users"("role_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_usercompany_role_id" ON "userCompany"("role_id")`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS "idx_usercompany_role_id"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "idx_users_role_id"`);
    await queryRunner.query(
      `ALTER TABLE "userCompany" DROP CONSTRAINT IF EXISTS "FK_userCompany_role"`,
    );
    await queryRunner.query(
      `ALTER TABLE "userCompany" DROP COLUMN IF EXISTS "role_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT IF EXISTS "FK_users_role"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN IF EXISTS "role_id"`,
    );
  }
}
