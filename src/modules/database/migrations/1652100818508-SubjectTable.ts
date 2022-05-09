import { MigrationInterface, QueryRunner } from "typeorm";

export class SubjectTable1652100818508 implements MigrationInterface {
    name = 'SubjectTable1652100818508'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."subject_gender_enum" AS ENUM(
                'CIS_WOMAN',
                'TRANS_WOMAN',
                'CIS_MAN',
                'TRANS_MAN',
                'NON_BINARY',
                'TRANSVESTITE',
                'NOT_DECLARED'
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "subject" (
                "subject_id" uuid NOT NULL,
                "user_id" uuid NOT NULL,
                "name" character varying(15) NOT NULL,
                "surname" character varying(50) NOT NULL,
                "email" character varying(100) NOT NULL,
                "birthdate" date NOT NULL,
                "gender" "public"."subject_gender_enum" NOT NULL,
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
            ALTER TABLE "user"
            ALTER COLUMN "created_at"
            SET DEFAULT 'now()'
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
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
            ALTER TABLE "subject"
            ADD CONSTRAINT "FK_8a43ea23dd48636f32517a1b920" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "address"
            ADD CONSTRAINT "FK_395fbfbb92df205376297da84d7" FOREIGN KEY ("subject_id") REFERENCES "subject"("subject_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "address" DROP CONSTRAINT "FK_395fbfbb92df205376297da84d7"
        `);
        await queryRunner.query(`
            ALTER TABLE "subject" DROP CONSTRAINT "FK_8a43ea23dd48636f32517a1b920"
        `);
        await queryRunner.query(`
            ALTER TABLE "cooking_measure"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-05-07 03:24:35.930189'
        `);
        await queryRunner.query(`
            ALTER TABLE "cooking_measure"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-07 03:24:35.930189'
        `);
        await queryRunner.query(`
            ALTER TABLE "aliment"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-05-07 03:24:35.930189'
        `);
        await queryRunner.query(`
            ALTER TABLE "aliment"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-07 03:24:35.930189'
        `);
        await queryRunner.query(`
            ALTER TABLE "composition"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-05-07 03:24:35.930189'
        `);
        await queryRunner.query(`
            ALTER TABLE "composition"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-07 03:24:35.930189'
        `);
        await queryRunner.query(`
            ALTER TABLE "reference"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-05-07 03:24:35.930189'
        `);
        await queryRunner.query(`
            ALTER TABLE "reference"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-07 03:24:35.930189'
        `);
        await queryRunner.query(`
            ALTER TABLE "nutrient"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-05-07 03:24:35.930189'
        `);
        await queryRunner.query(`
            ALTER TABLE "nutrient"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-07 03:24:35.930189'
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-05-07 03:24:35.930189'
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-07 03:24:35.930189'
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
        await queryRunner.query(`
            DROP TYPE "public"."subject_gender_enum"
        `);
    }

}
