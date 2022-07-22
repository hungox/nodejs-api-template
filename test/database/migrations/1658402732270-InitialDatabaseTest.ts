import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialDatabaseTest1658402732270 implements MigrationInterface {
  name = 'InitialDatabaseTest1658402732270';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "merchant_id" integer NOT NULL)`
    );
    await queryRunner.query(
      `CREATE TABLE "merchant" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "role" varchar NOT NULL)`
    );
    await queryRunner.query(
      `CREATE TABLE "policy" ("id" varchar PRIMARY KEY NOT NULL, "amount_insured" integer NOT NULL, "email" varchar NOT NULL, "inception_date" datetime NOT NULL, "installment_payment" boolean NOT NULL, "client_id" varchar)`
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "merchant_id" integer NOT NULL, CONSTRAINT "FK_df7e9454995f34175b912a28fd8" FOREIGN KEY ("merchant_id") REFERENCES "merchant" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_post"("id", "created_at", "updated_at", "merchant_id") SELECT "id", "created_at", "updated_at", "merchant_id" FROM "post"`
    );
    await queryRunner.query(`DROP TABLE "post"`);
    await queryRunner.query(`ALTER TABLE "temporary_post" RENAME TO "post"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_policy" ("id" varchar PRIMARY KEY NOT NULL, "amount_insured" integer NOT NULL, "email" varchar NOT NULL, "inception_date" datetime NOT NULL, "installment_payment" boolean NOT NULL, "client_id" varchar, CONSTRAINT "FK_92c83c9df3119f6d0727f368f44" FOREIGN KEY ("client_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_policy"("id", "amount_insured", "email", "inception_date", "installment_payment", "client_id") SELECT "id", "amount_insured", "email", "inception_date", "installment_payment", "client_id" FROM "policy"`
    );
    await queryRunner.query(`DROP TABLE "policy"`);
    await queryRunner.query(`ALTER TABLE "temporary_policy" RENAME TO "policy"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "policy" RENAME TO "temporary_policy"`);
    await queryRunner.query(
      `CREATE TABLE "policy" ("id" varchar PRIMARY KEY NOT NULL, "amount_insured" integer NOT NULL, "email" varchar NOT NULL, "inception_date" datetime NOT NULL, "installment_payment" boolean NOT NULL, "client_id" varchar)`
    );
    await queryRunner.query(
      `INSERT INTO "policy"("id", "amount_insured", "email", "inception_date", "installment_payment", "client_id") SELECT "id", "amount_insured", "email", "inception_date", "installment_payment", "client_id" FROM "temporary_policy"`
    );
    await queryRunner.query(`DROP TABLE "temporary_policy"`);
    await queryRunner.query(`ALTER TABLE "post" RENAME TO "temporary_post"`);
    await queryRunner.query(
      `CREATE TABLE "post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "merchant_id" integer NOT NULL)`
    );
    await queryRunner.query(
      `INSERT INTO "post"("id", "created_at", "updated_at", "merchant_id") SELECT "id", "created_at", "updated_at", "merchant_id" FROM "temporary_post"`
    );
    await queryRunner.query(`DROP TABLE "temporary_post"`);
    await queryRunner.query(`DROP TABLE "policy"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`DROP TABLE "merchant"`);
    await queryRunner.query(`DROP TABLE "post"`);
  }
}
