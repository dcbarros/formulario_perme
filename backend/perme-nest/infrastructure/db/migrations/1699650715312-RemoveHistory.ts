import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveHistory1699650715312 implements MigrationInterface {
    name = 'RemoveHistory1699650715312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "history"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "history" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "event" "public"."history_event_enum" NOT NULL DEFAULT 'admission', "metadata" text NOT NULL, "admissionId" integer, CONSTRAINT "PK_9384942edf4804b38ca0ee51416" PRIMARY KEY ("id"))`);
    }

}
