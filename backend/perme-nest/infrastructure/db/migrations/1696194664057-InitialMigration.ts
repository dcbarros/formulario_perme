import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1696194664057 implements MigrationInterface {
    name = 'InitialMigration1696194664057'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "perme_option" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "description" character varying NOT NULL, "points" integer NOT NULL, "itemId" integer, CONSTRAINT "PK_a2bb4d2375a08de67fbd34a6649" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "perme_item" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "position" integer NOT NULL, "description" character varying NOT NULL, "categoryId" integer, CONSTRAINT "PK_807ecba41142516028b7422d8a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "perme_category" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "position" integer NOT NULL, "maxPoints" integer NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_4d7bec1bb482f18015cdc95e99d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "patient" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "internalCode" character varying NOT NULL, CONSTRAINT "UQ_37d67c6dcff9863d1132f5ecd9a" UNIQUE ("internalCode"), CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "measurement" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "score" integer NOT NULL, "isFinished" boolean NOT NULL, "admissionId" integer, CONSTRAINT "PK_742ff3cc0dcbbd34533a9071dfd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."history_event_enum" AS ENUM('admission', 'hospital_discharge', 'clinical_discharge', 'measurement')`);
        await queryRunner.query(`CREATE TABLE "history" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "event" "public"."history_event_enum" NOT NULL DEFAULT 'admission', "metadata" text NOT NULL, "admissionId" integer, CONSTRAINT "PK_9384942edf4804b38ca0ee51416" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admission" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "dischargedAt" TIMESTAMP NOT NULL, "patientId" integer, CONSTRAINT "PK_6e91be345099f3da80fb2cc0d9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "perme_option" ADD CONSTRAINT "FK_41105ccf41a1e74d2e83b106851" FOREIGN KEY ("itemId") REFERENCES "perme_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "perme_item" ADD CONSTRAINT "FK_03c33bf3a424ed39a28e4cc1a19" FOREIGN KEY ("categoryId") REFERENCES "perme_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD CONSTRAINT "FK_665ff8304d985668c80f97e4b0d" FOREIGN KEY ("admissionId") REFERENCES "admission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "history" ADD CONSTRAINT "FK_1d7c03dde6eca9e00f6be8c3907" FOREIGN KEY ("admissionId") REFERENCES "admission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "admission" ADD CONSTRAINT "FK_4ae3c4c68bb74c836be26d4f9d6" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE TABLE "physiotherapist" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "lastName" character varying NOT NULL, "identifier" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'physio', CONSTRAINT "UQ_6c3b327adb3c46fc4c58120615b" UNIQUE ("identifier"), CONSTRAINT "PK_78798c0aeddaa6d9db77d4069f3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "physiotherapist"`);
        await queryRunner.query(`DROP TABLE "physiotherapist"`);
        await queryRunner.query(`ALTER TABLE "admission" DROP CONSTRAINT "FK_4ae3c4c68bb74c836be26d4f9d6"`);
        await queryRunner.query(`ALTER TABLE "history" DROP CONSTRAINT "FK_1d7c03dde6eca9e00f6be8c3907"`);
        await queryRunner.query(`ALTER TABLE "measurement" DROP CONSTRAINT "FK_665ff8304d985668c80f97e4b0d"`);
        await queryRunner.query(`ALTER TABLE "perme_item" DROP CONSTRAINT "FK_03c33bf3a424ed39a28e4cc1a19"`);
        await queryRunner.query(`ALTER TABLE "perme_option" DROP CONSTRAINT "FK_41105ccf41a1e74d2e83b106851"`);
        await queryRunner.query(`DROP TABLE "admission"`);
        await queryRunner.query(`DROP TABLE "history"`);
        await queryRunner.query(`DROP TYPE "public"."history_event_enum"`);
        await queryRunner.query(`DROP TABLE "measurement"`);
        await queryRunner.query(`DROP TABLE "patient"`);
        await queryRunner.query(`DROP TABLE "perme_category"`);
        await queryRunner.query(`DROP TABLE "perme_item"`);
        await queryRunner.query(`DROP TABLE "perme_option"`);
    }

}
