import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMeasurementsRelationships1699551809595 implements MigrationInterface {
    name = 'AddMeasurementsRelationships1699551809595'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "measurement" DROP COLUMN "isFinished"`);
        await queryRunner.query(`ALTER TABLE "measurement" DROP CONSTRAINT "FK_df7e789b2ded0eb0a9d79ba23f2"`);
        await queryRunner.query(`ALTER TABLE "measurement" DROP CONSTRAINT "UQ_df7e789b2ded0eb0a9d79ba23f2"`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD CONSTRAINT "FK_df7e789b2ded0eb0a9d79ba23f2" FOREIGN KEY ("physiotherapistId") REFERENCES "physiotherapist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "measurement" DROP CONSTRAINT "FK_df7e789b2ded0eb0a9d79ba23f2"`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD CONSTRAINT "UQ_df7e789b2ded0eb0a9d79ba23f2" UNIQUE ("physiotherapistId")`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD CONSTRAINT "FK_df7e789b2ded0eb0a9d79ba23f2" FOREIGN KEY ("physiotherapistId") REFERENCES "physiotherapist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD "isFinished" boolean NOT NULL`);
    }

}
