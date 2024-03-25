import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAdmissionTable1699632274614 implements MigrationInterface {
    name = 'UpdateAdmissionTable1699632274614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admission" ALTER COLUMN "dischargedAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admission" ALTER COLUMN "dischargedType" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admission" ALTER COLUMN "dischargedType" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admission" ALTER COLUMN "dischargedAt" SET NOT NULL`);
    }

}
