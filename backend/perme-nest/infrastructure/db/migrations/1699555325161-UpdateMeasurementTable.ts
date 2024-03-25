import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMeasurementTable1699555325161 implements MigrationInterface {
    name = 'UpdateMeasurementTable1699555325161'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "measurement" ADD "scoreTitle" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "measurement" DROP COLUMN "scoreTitle"`);
    }

}
