import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterPatientMeasurementTables1699464303712 implements MigrationInterface {
    name = 'AlterPatientMeasurementTables1699464303712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "history" DROP CONSTRAINT "FK_1d7c03dde6eca9e00f6be8c3907"`);
        await queryRunner.query(`ALTER TABLE "admission" DROP CONSTRAINT "FK_4ae3c4c68bb74c836be26d4f9d6"`);
        await queryRunner.query(`ALTER TABLE "measurement" DROP CONSTRAINT "FK_665ff8304d985668c80f97e4b0d"`);
        await queryRunner.query(`ALTER TABLE "history" DROP COLUMN "admissionId"`);
        await queryRunner.query(`ALTER TABLE "admission" DROP COLUMN "dischargedAt"`);
        await queryRunner.query(`ALTER TABLE "admission" DROP COLUMN "patientId"`);
        await queryRunner.query(`ALTER TABLE "measurement" DROP COLUMN "admissionId"`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "admissionDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "dischargetAt" TIMESTAMP`);
        await queryRunner.query(`CREATE TYPE "public"."patient_patientstatus_enum" AS ENUM('PENDING', 'NURSERY', 'CTI')`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "patientStatus" "public"."patient_patientstatus_enum" NOT NULL DEFAULT 'PENDING'`);
        await queryRunner.query(`CREATE TYPE "public"."patient_patientdischargedat_enum" AS ENUM('NOTDISCHARGETAT', 'HOSPITAL', 'PHYSIOTHERAPY')`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "patientDischargedAt" "public"."patient_patientdischargedat_enum" NOT NULL DEFAULT 'NOTDISCHARGETAT'`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "dischargedObs" text`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD "patientId" integer`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD "physiotherapistId" integer`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD CONSTRAINT "UQ_df7e789b2ded0eb0a9d79ba23f2" UNIQUE ("physiotherapistId")`);
        await queryRunner.query(`ALTER TABLE "physiotherapist" DROP COLUMN "role"`);
        await queryRunner.query(`CREATE TYPE "public"."physiotherapist_role_enum" AS ENUM('admin', 'physio')`);
        await queryRunner.query(`ALTER TABLE "physiotherapist" ADD "role" "public"."physiotherapist_role_enum" NOT NULL DEFAULT 'physio'`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD CONSTRAINT "FK_29df1673164b16515c4229ee764" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD CONSTRAINT "FK_df7e789b2ded0eb0a9d79ba23f2" FOREIGN KEY ("physiotherapistId") REFERENCES "physiotherapist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "measurement" DROP CONSTRAINT "FK_df7e789b2ded0eb0a9d79ba23f2"`);
        await queryRunner.query(`ALTER TABLE "measurement" DROP CONSTRAINT "FK_29df1673164b16515c4229ee764"`);
        await queryRunner.query(`ALTER TABLE "physiotherapist" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."physiotherapist_role_enum"`);
        await queryRunner.query(`ALTER TABLE "physiotherapist" ADD "role" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "measurement" DROP CONSTRAINT "UQ_df7e789b2ded0eb0a9d79ba23f2"`);
        await queryRunner.query(`ALTER TABLE "measurement" DROP COLUMN "physiotherapistId"`);
        await queryRunner.query(`ALTER TABLE "measurement" DROP COLUMN "patientId"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "dischargedObs"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "patientDischargedAt"`);
        await queryRunner.query(`DROP TYPE "public"."patient_patientdischargedat_enum"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "patientStatus"`);
        await queryRunner.query(`DROP TYPE "public"."patient_patientstatus_enum"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "dischargetAt"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "admissionDate"`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD "admissionId" integer`);
        await queryRunner.query(`ALTER TABLE "admission" ADD "patientId" integer`);
        await queryRunner.query(`ALTER TABLE "admission" ADD "dischargedAt" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "history" ADD "admissionId" integer`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD CONSTRAINT "FK_665ff8304d985668c80f97e4b0d" FOREIGN KEY ("admissionId") REFERENCES "admission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "admission" ADD CONSTRAINT "FK_4ae3c4c68bb74c836be26d4f9d6" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "history" ADD CONSTRAINT "FK_1d7c03dde6eca9e00f6be8c3907" FOREIGN KEY ("admissionId") REFERENCES "admission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
