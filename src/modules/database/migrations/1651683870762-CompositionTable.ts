import { MigrationInterface, QueryRunner } from "typeorm";

export class CompositionTable1651683870762 implements MigrationInterface {
    name = 'CompositionTable1651683870762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "composition" (
                "composition_id" uuid NOT NULL,
                "aliment_id" uuid NOT NULL,
                "reference_id" uuid NOT NULL,
                "quantity" double precision NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT 'now()',
                "updated_at" TIMESTAMP NOT NULL DEFAULT 'now()',
                CONSTRAINT "PK_b6ed66cbbd6104ea1b3d34bb42d" PRIMARY KEY ("composition_id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "composition_nutrient"
            ADD "composition_id" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "composition_nutrient" DROP CONSTRAINT "PK_204d5167c45993fc1009b0590c7"
        `);
        await queryRunner.query(`
            ALTER TABLE "composition_nutrient"
            ADD CONSTRAINT "PK_1821b297fec5e646e58ea5c75b2" PRIMARY KEY ("nutrient_id", "composition_id")
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
            ALTER TABLE "composition_nutrient"
            ADD CONSTRAINT "FK_7f3dfeb995811949a855d98f747" FOREIGN KEY ("composition_id") REFERENCES "composition"("composition_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "composition_nutrient" DROP CONSTRAINT "FK_7f3dfeb995811949a855d98f747"
        `);
        await queryRunner.query(`
            ALTER TABLE "reference"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-05-04 00:53:29.896754'
        `);
        await queryRunner.query(`
            ALTER TABLE "reference"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-04 00:53:29.896754'
        `);
        await queryRunner.query(`
            ALTER TABLE "cooking_measure"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-05-04 00:53:29.896754'
        `);
        await queryRunner.query(`
            ALTER TABLE "cooking_measure"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-04 00:53:29.896754'
        `);
        await queryRunner.query(`
            ALTER TABLE "nutrient"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-05-04 00:53:29.896754'
        `);
        await queryRunner.query(`
            ALTER TABLE "nutrient"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-04 00:53:29.896754'
        `);
        await queryRunner.query(`
            ALTER TABLE "composition_nutrient" DROP CONSTRAINT "PK_1821b297fec5e646e58ea5c75b2"
        `);
        await queryRunner.query(`
            ALTER TABLE "composition_nutrient"
            ADD CONSTRAINT "PK_204d5167c45993fc1009b0590c7" PRIMARY KEY ("nutrient_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "composition_nutrient" DROP COLUMN "composition_id"
        `);
        await queryRunner.query(`
            DROP TABLE "composition"
        `);
    }

}
