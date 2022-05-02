import { MigrationInterface, QueryRunner } from "typeorm";

export class ReferenceTable1651508536030 implements MigrationInterface {
    name = 'ReferenceTable1651508536030'

    public async up(queryRunner: QueryRunner): Promise<void> {
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "public"."IDX_reference_is_active"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_reference_name"
        `);
        await queryRunner.query(`
            DROP TABLE "reference"
        `);
    }

}
