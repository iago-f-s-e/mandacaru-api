import { MigrationInterface, QueryRunner } from "typeorm";

export class AlimentMeasureTable1651762182667 implements MigrationInterface {
    name = 'AlimentMeasureTable1651762182667'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "aliment_measure" (
                "aliment_measure_id" uuid NOT NULL,
                "aliment_id" uuid NOT NULL,
                "measure_id" uuid NOT NULL,
                "reference_id" uuid NOT NULL,
                "quantity" double precision NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                CONSTRAINT "PK_77515bc3429776727a7aeaa8f5c" PRIMARY KEY ("aliment_measure_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_aliment_measure_is_active" ON "aliment_measure" ("is_active")
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
        await queryRunner.query(`
            ALTER TABLE "composition"
            ALTER COLUMN "created_at"
            SET DEFAULT 'now()'
        `);
        await queryRunner.query(`
            ALTER TABLE "composition"
            ALTER COLUMN "updated_at"
            SET DEFAULT 'now()'
        `);
        await queryRunner.query(`
            ALTER TABLE "aliment"
            ALTER COLUMN "created_at"
            SET DEFAULT 'now()'
        `);
        await queryRunner.query(`
            ALTER TABLE "aliment"
            ALTER COLUMN "updated_at"
            SET DEFAULT 'now()'
        `);
        await queryRunner.query(`
            ALTER TABLE "cooking_measure"
            ALTER COLUMN "created_at"
            SET DEFAULT 'now()'
        `);
        await queryRunner.query(`
            ALTER TABLE "cooking_measure"
            ALTER COLUMN "updated_at"
            SET DEFAULT 'now()'
        `);
        await queryRunner.query(`
            ALTER TABLE "aliment_measure"
            ADD CONSTRAINT "FK_d6d562799dd77eb13c8be956c03" FOREIGN KEY ("aliment_id") REFERENCES "aliment"("aliment_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "aliment_measure"
            ADD CONSTRAINT "FK_31a34b8bd90271ac49b1a721360" FOREIGN KEY ("measure_id") REFERENCES "cooking_measure"("cooking_measure_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "aliment_measure"
            ADD CONSTRAINT "FK_39172dc7fd050843a9743388189" FOREIGN KEY ("reference_id") REFERENCES "reference"("reference_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "aliment_measure" DROP CONSTRAINT "FK_39172dc7fd050843a9743388189"
        `);
        await queryRunner.query(`
            ALTER TABLE "aliment_measure" DROP CONSTRAINT "FK_31a34b8bd90271ac49b1a721360"
        `);
        await queryRunner.query(`
            ALTER TABLE "aliment_measure" DROP CONSTRAINT "FK_d6d562799dd77eb13c8be956c03"
        `);
        await queryRunner.query(`
            ALTER TABLE "cooking_measure"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-05-04 18:01:57.357703'
        `);
        await queryRunner.query(`
            ALTER TABLE "cooking_measure"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-04 18:01:57.357703'
        `);
        await queryRunner.query(`
            ALTER TABLE "aliment"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-05-04 18:01:57.357703'
        `);
        await queryRunner.query(`
            ALTER TABLE "aliment"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-04 18:01:57.357703'
        `);
        await queryRunner.query(`
            ALTER TABLE "composition"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-05-04 18:01:57.357703'
        `);
        await queryRunner.query(`
            ALTER TABLE "composition"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-04 18:01:57.357703'
        `);
        await queryRunner.query(`
            ALTER TABLE "reference"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-05-04 18:01:57.357703'
        `);
        await queryRunner.query(`
            ALTER TABLE "reference"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-04 18:01:57.357703'
        `);
        await queryRunner.query(`
            ALTER TABLE "nutrient"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-05-04 18:01:57.357703'
        `);
        await queryRunner.query(`
            ALTER TABLE "nutrient"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-04 18:01:57.357703'
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_aliment_measure_is_active"
        `);
        await queryRunner.query(`
            DROP TABLE "aliment_measure"
        `);
    }

}
