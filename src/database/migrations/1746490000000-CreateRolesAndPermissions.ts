import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRolesAndPermissions1746490000000
  implements MigrationInterface
{
  name = 'CreateRolesAndPermissions1746490000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "roles" (
        "id"          UUID         NOT NULL DEFAULT gen_random_uuid(),
        "createdAt"   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
        "createUser"  VARCHAR(50)  NULL,
        "updatedAt"   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
        "updateUser"  VARCHAR(50)  NULL,
        "name"        VARCHAR(50)  NOT NULL,
        "description" VARCHAR(200) NULL,
        "isActive"    BOOLEAN      NOT NULL DEFAULT TRUE,
        CONSTRAINT "PK_roles" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_roles_name" UNIQUE ("name")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "permissions" (
        "id"          UUID         NOT NULL DEFAULT gen_random_uuid(),
        "name"        VARCHAR(100) NOT NULL,
        "resource"    VARCHAR(50)  NOT NULL,
        "action"      VARCHAR(50)  NOT NULL,
        "description" VARCHAR(200) NULL,
        "createdAt"   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
        CONSTRAINT "PK_permissions" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_permissions_name" UNIQUE ("name")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "role_permissions" (
        "role_id"       UUID NOT NULL,
        "permission_id" UUID NOT NULL,
        CONSTRAINT "PK_role_permissions" PRIMARY KEY ("role_id", "permission_id"),
        CONSTRAINT "FK_role_permissions_role" FOREIGN KEY ("role_id")
          REFERENCES "roles"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_role_permissions_permission" FOREIGN KEY ("permission_id")
          REFERENCES "permissions"("id") ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`CREATE INDEX "idx_roles_name" ON "roles"("name")`);
    await queryRunner.query(
      `CREATE INDEX "idx_permissions_name" ON "permissions"("name")`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_permissions_resource" ON "permissions"("resource")`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_role_perms_role_id" ON "role_permissions"("role_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_role_perms_perm_id" ON "role_permissions"("permission_id")`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "role_permissions"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "permissions"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "roles"`);
  }
}
