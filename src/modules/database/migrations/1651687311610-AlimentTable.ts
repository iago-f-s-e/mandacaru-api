import { MigrationInterface, QueryRunner } from "typeorm";

export class AlimentTable1651687311610 implements MigrationInterface {
    name = 'AlimentTable1651687311610'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "aliment" (
                "aliment_id" uuid NOT NULL,
                "name" character varying(100) NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                "created_at" TIMESTAMP NOT NULL DEFAULT 'now()',
                "updated_at" TIMESTAMP NOT NULL DEFAULT 'now()',
                CONSTRAINT "PK_0f17014c412ac288c1859e2566b" PRIMARY KEY ("aliment_id")
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_aliment_name" ON "aliment" ("name")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_aliment_is_active" ON "aliment" ("is_active")
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
            ADD CONSTRAINT "UQ_da2133a580f000049d522628603" UNIQUE ("aliment_id")
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
            ALTER TABLE "composition"
            ADD CONSTRAINT "FK_da2133a580f000049d522628603" FOREIGN KEY ("aliment_id") REFERENCES "aliment"("aliment_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "composition"
            ADD CONSTRAINT "FK_a6c151fdfc2e84057d88d925ae8" FOREIGN KEY ("reference_id") REFERENCES "reference"("reference_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "composition" DROP CONSTRAINT "FK_a6c151fdfc2e84057d88d925ae8"
        `);
        await queryRunner.query(`
            ALTER TABLE "composition" DROP CONSTRAINT "FK_da2133a580f000049d522628603"
        `);
        await queryRunner.query(`
            ALTER TABLE "cooking_measure"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-05-04 17:04:36.67005'
        `);
        await queryRunner.query(`
            ALTER TABLE "cooking_measure"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-04 17:04:36.67005'
        `);
        await queryRunner.query(`
            ALTER TABLE "composition"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-05-04 17:04:36.67005'
        `);
        await queryRunner.query(`
            ALTER TABLE "composition"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-04 17:04:36.67005'
        `);
        await queryRunner.query(`
            ALTER TABLE "composition" DROP CONSTRAINT "UQ_da2133a580f000049d522628603"
        `);
        await queryRunner.query(`
            ALTER TABLE "reference"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-05-04 17:04:36.67005'
        `);
        await queryRunner.query(`
            ALTER TABLE "reference"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-04 17:04:36.67005'
        `);
        await queryRunner.query(`
            ALTER TABLE "nutrient"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-05-04 17:04:36.67005'
        `);
        await queryRunner.query(`
            ALTER TABLE "nutrient"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-04 17:04:36.67005'
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_aliment_is_active"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_aliment_name"
        `);
        await queryRunner.query(`
            DROP TABLE "aliment"
        `);
    }

}
