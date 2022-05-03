import { MigrationInterface, QueryRunner } from "typeorm";

export class NutrientTable1651604085190 implements MigrationInterface {
    name = 'NutrientTable1651604085190'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "nutrient" (
                "nutrient_id" uuid NOT NULL,
                "name" character varying(50) NOT NULL,
                "abbreviation" character varying(10) NOT NULL,
                "unit_measure" character varying(10) NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                "created_at" TIMESTAMP NOT NULL DEFAULT 'now()',
                "updated_at" TIMESTAMP NOT NULL DEFAULT 'now()',
                CONSTRAINT "PK_4d38ff93c651f2ed53ae008a5c5" PRIMARY KEY ("nutrient_id")
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_nutrient_name" ON "nutrient" ("name")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_nutrient_is_active" ON "nutrient" ("is_active")
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
            SET DEFAULT '2022-05-02 16:22:21.404315'
        `);
        await queryRunner.query(`
            ALTER TABLE "reference"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-02 16:22:21.404315'
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_nutrient_is_active"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_nutrient_name"
        `);
        await queryRunner.query(`
            DROP TABLE "nutrient"
        `);
    }

}
