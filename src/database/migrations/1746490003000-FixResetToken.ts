import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixResetToken1746490003000 implements MigrationInterface {
  name = 'FixResetToken1746490003000';

  async up(queryRunner: QueryRunner): Promise<void> {
    // Drop legacy table if it was never properly created (no PK, no @Entity)
    await queryRunner.query(`DROP TABLE IF EXISTS "reset_token"`);

    await queryRunner.query(`
      CREATE TABLE "reset_token" (
        "id"          UUID         NOT NULL DEFAULT gen_random_uuid(),
        "token"       VARCHAR(100) NOT NULL,
        "userId"      UUID         NOT NULL,
        "expiryDate"  TIMESTAMPTZ  NOT NULL,
        "createdAt"   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
        CONSTRAINT "PK_reset_token" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_reset_token_token" UNIQUE ("token"),
        CONSTRAINT "FK_reset_token_user" FOREIGN KEY ("userId")
          REFERENCES "users"("id") ON DELETE CASCADE
      )
    `);

    await queryRunner.query(
      `CREATE INDEX "idx_reset_token_token" ON "reset_token"("token")`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_reset_token_user_id" ON "reset_token"("userId")`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "reset_token"`);
  }
}
