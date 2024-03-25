import { MigrationInterface, QueryRunner } from "typeorm";

export class HistoryMetadataInJsonColumn1697239952303 implements MigrationInterface {
    name = 'HistoryMetadataInJsonColumn1697239952303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "history" DROP COLUMN "metadata"`);
        await queryRunner.query(`ALTER TABLE "history" ADD "metadata" json NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "history" DROP COLUMN "metadata"`);
        await queryRunner.query(`ALTER TABLE "history" ADD "metadata" text NOT NULL`);
    }

}
