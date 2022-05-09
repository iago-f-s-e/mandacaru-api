import { MigrationInterface, QueryRunner } from "typeorm";

export class DomainAndUserTable1652123806464 implements MigrationInterface {
    name = 'DomainAndUserTable1652123806464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "subject" (
                "subject_id" uuid NOT NULL,
                "user_id" uuid NOT NULL,
                "name" character varying(15) NOT NULL,
                "surname" character varying(50) NOT NULL,
                "email" character varying(100) NOT NULL,
                "birthdate" date NOT NULL,
                "gender" character varying(12) NOT NULL,
                "weight" real NOT NULL,
                "height" real NOT NULL,
                "circumference" real NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                "created_at" TIMESTAMP NOT NULL DEFAULT 'now()',
                "updated_at" TIMESTAMP NOT NULL DEFAULT 'now()',
                CONSTRAINT "PK_70fbdd4144f3fc91373a93fe04a" PRIMARY KEY ("subject_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_subject_email" ON "subject" ("email")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_subject_is_active" ON "subject" ("is_active")
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_subject_email_user_id" ON "subject" ("email", "user_id")
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "user_id" uuid NOT NULL,
                "name" character varying(15) NOT NULL,
                "surname" character varying(50) NOT NULL,
                "email" character varying(100) NOT NULL,
                "document" character varying(114) NOT NULL,
                "status" character varying(9) NOT NULL DEFAULT 'TEMPORARY',
                "role" character varying(14) NOT NULL,
                "password" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT 'now()',
                "updated_at" TIMESTAMP NOT NULL DEFAULT 'now()',
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "UQ_71fdad8489d3d818ec393e6eb14" UNIQUE ("document"),
                CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id")
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_user_email" ON "user" ("email")
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_user_document" ON "user" ("document")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_user_status" ON "user" ("status")
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_user_email_status" ON "user" ("email", "status")
        `);
        await queryRunner.query(`
            CREATE TABLE "address" (
                "address_id" uuid NOT NULL,
                "user_id" uuid,
                "subject_id" uuid,
                "state" character varying(35) NOT NULL,
                "city" character varying(58) NOT NULL,
                "district" character varying(150) NOT NULL,
                "street" character varying(200) NOT NULL,
                "zip_code" character varying(109) NOT NULL,
                "complement" character varying(130),
                "number" integer,
                CONSTRAINT "PK_db4aae0a059fd4ef7709cb802b0" PRIMARY KEY ("address_id")
            )
        `);
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
            CREATE TABLE "composition_nutrient" (
                "composition_id" uuid NOT NULL,
                "nutrient_id" uuid NOT NULL,
                "quantity" double precision NOT NULL,
                CONSTRAINT "PK_1821b297fec5e646e58ea5c75b2" PRIMARY KEY ("composition_id", "nutrient_id")
            )
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
            CREATE TABLE "reference" (
                "reference_id" uuid NOT NULL,
                "name" character varying(150) NOT NULL,
                "abbreviation" character varying(10) NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                "created_at" TIMESTAMP NOT NULL DEFAULT 'now()',
                "updated_at" TIMESTAMP NOT NULL DEFAULT 'now()',
                CONSTRAINT "PK_05b938fd1b948f22e9aae211a31" PRIMARY KEY ("reference_id")
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_reference_name" ON "reference" ("name")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_reference_is_active" ON "reference" ("is_active")
        `);
        await queryRunner.query(`
            CREATE TABLE "composition" (
                "composition_id" uuid NOT NULL,
                "aliment_id" uuid NOT NULL,
                "reference_id" uuid NOT NULL,
                "quantity" double precision NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT 'now()',
                "updated_at" TIMESTAMP NOT NULL DEFAULT 'now()',
                CONSTRAINT "REL_da2133a580f000049d52262860" UNIQUE ("aliment_id"),
                CONSTRAINT "PK_b6ed66cbbd6104ea1b3d34bb42d" PRIMARY KEY ("composition_id")
            )
        `);
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
            ALTER TABLE "subject"
            ADD CONSTRAINT "FK_8a43ea23dd48636f32517a1b920" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "address"
            ADD CONSTRAINT "FK_35cd6c3fafec0bb5d072e24ea20" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "address"
            ADD CONSTRAINT "FK_395fbfbb92df205376297da84d7" FOREIGN KEY ("subject_id") REFERENCES "subject"("subject_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "composition_nutrient"
            ADD CONSTRAINT "FK_7f3dfeb995811949a855d98f747" FOREIGN KEY ("composition_id") REFERENCES "composition"("composition_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "composition_nutrient"
            ADD CONSTRAINT "FK_204d5167c45993fc1009b0590c7" FOREIGN KEY ("nutrient_id") REFERENCES "nutrient"("nutrient_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "recipe_composition"
            ADD CONSTRAINT "FK_b5c29d0406e4f131efc040ce0ea" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("recipe_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "recipe_composition"
            ADD CONSTRAINT "FK_c9d1dd450fa4b466f1394d780a1" FOREIGN KEY ("aliment_measure_id") REFERENCES "aliment_measure"("aliment_measure_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "recipe"
            ADD CONSTRAINT "FK_8a8321ddc86b384cb306f50dc77" FOREIGN KEY ("reference_id") REFERENCES "reference"("reference_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "composition"
            ADD CONSTRAINT "FK_da2133a580f000049d522628603" FOREIGN KEY ("aliment_id") REFERENCES "aliment"("aliment_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "composition"
            ADD CONSTRAINT "FK_a6c151fdfc2e84057d88d925ae8" FOREIGN KEY ("reference_id") REFERENCES "reference"("reference_id") ON DELETE CASCADE ON UPDATE CASCADE
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
            ALTER TABLE "composition" DROP CONSTRAINT "FK_a6c151fdfc2e84057d88d925ae8"
        `);
        await queryRunner.query(`
            ALTER TABLE "composition" DROP CONSTRAINT "FK_da2133a580f000049d522628603"
        `);
        await queryRunner.query(`
            ALTER TABLE "recipe" DROP CONSTRAINT "FK_8a8321ddc86b384cb306f50dc77"
        `);
        await queryRunner.query(`
            ALTER TABLE "recipe_composition" DROP CONSTRAINT "FK_c9d1dd450fa4b466f1394d780a1"
        `);
        await queryRunner.query(`
            ALTER TABLE "recipe_composition" DROP CONSTRAINT "FK_b5c29d0406e4f131efc040ce0ea"
        `);
        await queryRunner.query(`
            ALTER TABLE "composition_nutrient" DROP CONSTRAINT "FK_204d5167c45993fc1009b0590c7"
        `);
        await queryRunner.query(`
            ALTER TABLE "composition_nutrient" DROP CONSTRAINT "FK_7f3dfeb995811949a855d98f747"
        `);
        await queryRunner.query(`
            ALTER TABLE "address" DROP CONSTRAINT "FK_395fbfbb92df205376297da84d7"
        `);
        await queryRunner.query(`
            ALTER TABLE "address" DROP CONSTRAINT "FK_35cd6c3fafec0bb5d072e24ea20"
        `);
        await queryRunner.query(`
            ALTER TABLE "subject" DROP CONSTRAINT "FK_8a43ea23dd48636f32517a1b920"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_aliment_measure_is_active"
        `);
        await queryRunner.query(`
            DROP TABLE "aliment_measure"
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
        await queryRunner.query(`
            DROP INDEX "public"."IDX_aliment_is_active"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_aliment_name"
        `);
        await queryRunner.query(`
            DROP TABLE "aliment"
        `);
        await queryRunner.query(`
            DROP TABLE "composition"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_reference_is_active"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_reference_name"
        `);
        await queryRunner.query(`
            DROP TABLE "reference"
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
        await queryRunner.query(`
            DROP TABLE "recipe_composition"
        `);
        await queryRunner.query(`
            DROP TABLE "composition_nutrient"
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
        await queryRunner.query(`
            DROP TABLE "address"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_user_email_status"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_user_status"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_user_document"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_user_email"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_subject_email_user_id"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_subject_is_active"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_subject_email"
        `);
        await queryRunner.query(`
            DROP TABLE "subject"
        `);
    }

}
