import { MigrationInterface, QueryRunner } from "typeorm";

export class CookingMeasureTable1651618209382 implements MigrationInterface {
    name = 'CookingMeasureTable1651618209382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "cooking_measure" (
                "cooking_measure_id" uuid NOT NULL,
                "name" character varying(50) NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                "created_at" TIMESTAMP NOT NULL DEFAULT 'now()',
                "updated_at" TIMESTAMP NOT NULL DEFAULT 'now()',
                CONSTRAINT "PK_6e98827dcf2acc28f4308c13e52" PRIMARY KEY ("cooking_measure_id")
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_cooking_measure_name" ON "cooking_measure" ("name")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_cooking_measure_is_active" ON "cooking_measure" ("is_active")
        `);
        await queryRunner.query(`
            ALTER TABLE "nutrient"
            ALTER COLUMN "created_at"
            SET DEFAULT 'now()'
        `);
        await queryRunner.query(`
            ALTER TABLE "nutrient"
            ALTER COLUMN "updated_at"
            SET DEFAULT 'now()'
        `);
        await queryRunner.query(`
            ALTER TABLE "reference"
            ALTER COLUMN "created_at"
            SET DEFAULT 'now()'
        `);
        await queryRunner.query(`
            ALTER TABLE "reference"
            ALTER COLUMN "updated_at"
            SET DEFAULT 'now()'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "reference"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-05-03 22:50:00.92336'
        `);
        await queryRunner.query(`
            ALTER TABLE "reference"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-03 22:50:00.92336'
        `);
        await queryRunner.query(`
            ALTER TABLE "nutrient"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-05-03 22:50:00.92336'
        `);
        await queryRunner.query(`
            ALTER TABLE "nutrient"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-03 22:50:00.92336'
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_cooking_measure_is_active"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_cooking_measure_name"
        `);
        await queryRunner.query(`
            DROP TABLE "cooking_measure"
        `);
    }

}
