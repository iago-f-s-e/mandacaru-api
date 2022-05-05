import { MigrationInterface, QueryRunner } from "typeorm";

export class RecipeTable1651773548157 implements MigrationInterface {
    name = 'RecipeTable1651773548157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "recipe" (
                "recipe_id" uuid NOT NULL,
                "reference_id" uuid NOT NULL,
                "name" character varying(150) NOT NULL,
                "gram" double precision NOT NULL,
                "preparation_method" text,
                "is_active" boolean NOT NULL DEFAULT true,
                CONSTRAINT "PK_fac4e98d1c750e42f38a09ca327" PRIMARY KEY ("recipe_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_recipe_name" ON "recipe" ("name")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_recipe_active" ON "recipe" ("is_active")
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_recipe_name_reference" ON "recipe" ("reference_id", "name")
        `);
        await queryRunner.query(`
            CREATE TABLE "recipe_composition" (
                "recipe_id" uuid NOT NULL,
                "aliment_measure_id" uuid NOT NULL,
                "quantity" double precision NOT NULL,
                CONSTRAINT "PK_541a4f761a9e7d05b4649e0b17d" PRIMARY KEY ("recipe_id", "aliment_measure_id")
            )
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
            ALTER TABLE "recipe"
            ADD CONSTRAINT "FK_8a8321ddc86b384cb306f50dc77" FOREIGN KEY ("reference_id") REFERENCES "reference"("reference_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "recipe_composition"
            ADD CONSTRAINT "FK_b5c29d0406e4f131efc040ce0ea" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("recipe_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "recipe_composition"
            ADD CONSTRAINT "FK_c9d1dd450fa4b466f1394d780a1" FOREIGN KEY ("aliment_measure_id") REFERENCES "aliment_measure"("aliment_measure_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "recipe_composition" DROP CONSTRAINT "FK_c9d1dd450fa4b466f1394d780a1"
        `);
        await queryRunner.query(`
            ALTER TABLE "recipe_composition" DROP CONSTRAINT "FK_b5c29d0406e4f131efc040ce0ea"
        `);
        await queryRunner.query(`
            ALTER TABLE "recipe" DROP CONSTRAINT "FK_8a8321ddc86b384cb306f50dc77"
        `);
        await queryRunner.query(`
            ALTER TABLE "aliment"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-05-05 14:49:48.922956'
        `);
        await queryRunner.query(`
            ALTER TABLE "aliment"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-05 14:49:48.922956'
        `);
        await queryRunner.query(`
            ALTER TABLE "reference"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-05-05 14:49:48.922956'
        `);
        await queryRunner.query(`
            ALTER TABLE "reference"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-05 14:49:48.922956'
        `);
        await queryRunner.query(`
            ALTER TABLE "composition"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-05-05 14:49:48.922956'
        `);
        await queryRunner.query(`
            ALTER TABLE "composition"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-05 14:49:48.922956'
        `);
        await queryRunner.query(`
            ALTER TABLE "nutrient"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-05-05 14:49:48.922956'
        `);
        await queryRunner.query(`
            ALTER TABLE "nutrient"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-05 14:49:48.922956'
        `);
        await queryRunner.query(`
            ALTER TABLE "cooking_measure"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-05-05 14:49:48.922956'
        `);
        await queryRunner.query(`
            ALTER TABLE "cooking_measure"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-05 14:49:48.922956'
        `);
        await queryRunner.query(`
            DROP TABLE "recipe_composition"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_recipe_name_reference"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_recipe_active"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_recipe_name"
        `);
        await queryRunner.query(`
            DROP TABLE "recipe"
        `);
    }

}
