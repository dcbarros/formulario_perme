import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTransferToHistory1697238043093 implements MigrationInterface {
    name = 'AddTransferToHistory1697238043093'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."history_event_enum" RENAME TO "history_event_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."history_event_enum" AS ENUM('admission', 'hospital_discharge', 'clinical_discharge', 'measurement', 'transfer')`);
        await queryRunner.query(`ALTER TABLE "history" ALTER COLUMN "event" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "history" ALTER COLUMN "event" TYPE "public"."history_event_enum" USING "event"::"text"::"public"."history_event_enum"`);
        await queryRunner.query(`ALTER TABLE "history" ALTER COLUMN "event" SET DEFAULT 'admission'`);
        await queryRunner.query(`DROP TYPE "public"."history_event_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."history_event_enum_old" AS ENUM('admission', 'hospital_discharge', 'clinical_discharge', 'measurement')`);
        await queryRunner.query(`ALTER TABLE "history" ALTER COLUMN "event" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "history" ALTER COLUMN "event" TYPE "public"."history_event_enum_old" USING "event"::"text"::"public"."history_event_enum_old"`);
        await queryRunner.query(`ALTER TABLE "history" ALTER COLUMN "event" SET DEFAULT 'admission'`);
        await queryRunner.query(`DROP TYPE "public"."history_event_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."history_event_enum_old" RENAME TO "history_event_enum"`);
    }

}
