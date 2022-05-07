import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTable1651893869034 implements MigrationInterface {
    name = 'UserTable1651893869034'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."user_status_enum" AS ENUM(
                'TEMPORARY',
                'PENDING',
                'PERMANENT',
                'REJECTED',
                'DELETED'
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."user_role_enum" AS ENUM(
                'STUDENT',
                'INSTRUCTOR',
                'RESEARCHER',
                'PROFESSIONAL',
                'PUBLIC_MANAGER',
                'OTHER'
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "user_id" uuid NOT NULL,
                "name" character varying(15) NOT NULL,
                "surname" character varying(50) NOT NULL,
                "email" character varying(100) NOT NULL,
                "document" character varying(114) NOT NULL,
                "status" "public"."user_status_enum" NOT NULL DEFAULT 'TEMPORARY',
                "role" "public"."user_role_enum" NOT NULL,
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
            ALTER TABLE "address"
            ADD CONSTRAINT "FK_35cd6c3fafec0bb5d072e24ea20" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "address" DROP CONSTRAINT "FK_35cd6c3fafec0bb5d072e24ea20"
        `);
        await queryRunner.query(`
            ALTER TABLE "aliment"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-05-07 03:24:19.585163'
        `);
        await queryRunner.query(`
            ALTER TABLE "aliment"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-07 03:24:19.585163'
        `);
        await queryRunner.query(`
            ALTER TABLE "reference"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-05-07 03:24:19.585163'
        `);
        await queryRunner.query(`
            ALTER TABLE "reference"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-07 03:24:19.585163'
        `);
        await queryRunner.query(`
            ALTER TABLE "composition"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-05-07 03:24:19.585163'
        `);
        await queryRunner.query(`
            ALTER TABLE "composition"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-07 03:24:19.585163'
        `);
        await queryRunner.query(`
            ALTER TABLE "nutrient"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-05-07 03:24:19.585163'
        `);
        await queryRunner.query(`
            ALTER TABLE "nutrient"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-07 03:24:19.585163'
        `);
        await queryRunner.query(`
            ALTER TABLE "cooking_measure"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-05-07 03:24:19.585163'
        `);
        await queryRunner.query(`
            ALTER TABLE "cooking_measure"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-07 03:24:19.585163'
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
            DROP TYPE "public"."user_role_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."user_status_enum"
        `);
    }

}
