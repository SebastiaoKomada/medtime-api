import { MigrationInterface, QueryRunner } from "typeorm"

export class AlterTablePerfil1696732116224 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
        ALTER TABLE tblperfil ADD CONSTRAINT fk_perfil_usuario FOREIGN KEY (perUsuId) REFERENCES tblusuario(usuId) ON DELETE CASCADE ON UPDATE CASCADE
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
