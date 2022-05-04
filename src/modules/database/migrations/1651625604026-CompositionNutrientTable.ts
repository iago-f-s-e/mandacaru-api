import { MigrationInterface, QueryRunner } from "typeorm";

export class CompositionNutrientTable1651625604026 implements MigrationInterface {
    name = 'CompositionNutrientTable1651625604026'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "composition_nutrient" (
                "nutrient_id" uuid NOT NULL,
                "quantity" double precision NOT NULL,
                CONSTRAINT "PK_204d5167c45993fc1009b0590c7" PRIMARY KEY ("nutrient_id")
            )
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
            ADD CONSTRAINT "FK_204d5167c45993fc1009b0590c7" FOREIGN KEY ("nutrient_id") REFERENCES "nutrient"("nutrient_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "composition_nutrient" DROP CONSTRAINT "FK_204d5167c45993fc1009b0590c7"
        `);
        await queryRunner.query(`
            ALTER TABLE "reference"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-05-03 22:50:15.24486'
        `);
        await queryRunner.query(`
            ALTER TABLE "reference"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-03 22:50:15.24486'
        `);
        await queryRunner.query(`
            ALTER TABLE "cooking_measure"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-05-03 22:50:15.24486'
        `);
        await queryRunner.query(`
            ALTER TABLE "cooking_measure"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-03 22:50:15.24486'
        `);
        await queryRunner.query(`
            ALTER TABLE "nutrient"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-05-03 22:50:15.24486'
        `);
        await queryRunner.query(`
            ALTER TABLE "nutrient"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-03 22:50:15.24486'
        `);
        await queryRunner.query(`
            DROP TABLE "composition_nutrient"
        `);
    }

}
