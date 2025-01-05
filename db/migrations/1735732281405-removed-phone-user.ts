import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovedPhoneUser1735732281405 implements MigrationInterface {
    name = 'RemovedPhoneUser1735732281405'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying NOT NULL`);
    }

}
