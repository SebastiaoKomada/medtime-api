import { MigrationInterface, QueryRunner } from "typeorm"

export class AlterTableUser1696732106069 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
        ALTER TABLE tblusuario CHANGE usuTipo usuTipo INT(11) NOT NULL DEFAULT 1,
        add unique (usuEmail)
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
        `)
    }

}
