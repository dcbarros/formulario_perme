import { MigrationInterface, QueryRunner } from "typeorm";

export class AddObservationFieldToAdmission1699635167003 implements MigrationInterface {
    name = 'AddObservationFieldToAdmission1699635167003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admission" ADD "observation" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admission" DROP COLUMN "observation"`);
    }
}
