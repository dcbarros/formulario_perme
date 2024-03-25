import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEnum1699643715310 implements MigrationInterface {
    name = 'UpdateEnum1699643715310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."measurement_hospitalsector_enum" RENAME TO "measurement_hospitalsector_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."measurement_hospitalsector_enum" AS ENUM('CTI', 'Enfermaria')`);
        await queryRunner.query(`ALTER TABLE "measurement" ALTER COLUMN "hospitalSector" TYPE "public"."measurement_hospitalsector_enum" USING "hospitalSector"::"text"::"public"."measurement_hospitalsector_enum"`);
        await queryRunner.query(`DROP TYPE "public"."measurement_hospitalsector_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."measurement_hospitalsector_enum_old" AS ENUM('admin', 'physio')`);
        await queryRunner.query(`ALTER TABLE "measurement" ALTER COLUMN "hospitalSector" TYPE "public"."measurement_hospitalsector_enum_old" USING "hospitalSector"::"text"::"public"."measurement_hospitalsector_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."measurement_hospitalsector_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."measurement_hospitalsector_enum_old" RENAME TO "measurement_hospitalsector_enum"`);
    }

}
