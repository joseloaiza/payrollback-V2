import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAuditLogs1746490002000 implements MigrationInterface {
  name = 'CreateAuditLogs1746490002000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "audit_logs" (
        "id"              UUID         NOT NULL DEFAULT gen_random_uuid(),
        "user_id"         UUID         NULL,
        "action"          VARCHAR(100) NOT NULL,
        "resource"        VARCHAR(100) NULL,
        "resource_id"     VARCHAR(100) NULL,
        "company_id"      UUID         NULL,
        "ip_address"      VARCHAR(45)  NULL,
        "user_agent"      VARCHAR(500) NULL,
        "request_body"    JSONB        NULL,
        "response_status" SMALLINT     NULL,
        "details"         JSONB        NULL,
        "createdAt"       TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
        CONSTRAINT "PK_audit_logs" PRIMARY KEY ("id"),
        CONSTRAINT "FK_audit_logs_user" FOREIGN KEY ("user_id")
          REFERENCES "users"("id") ON DELETE SET NULL
      )
    `);

    await queryRunner.query(
      `CREATE INDEX "idx_audit_user_id" ON "audit_logs"("user_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_audit_action" ON "audit_logs"("action")`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_audit_resource" ON "audit_logs"("resource")`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_audit_created_at" ON "audit_logs"("createdAt")`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "audit_logs"`);
  }
}
