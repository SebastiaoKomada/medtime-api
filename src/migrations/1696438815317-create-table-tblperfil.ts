import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateTableTblperfil1696438815317 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
        CREATE TABLE tblperfil (
            perId int(11) PRIMARY KEY AUTO_INCREMENT,
            perNome varchar(100) NOT NULL,
            perImagem varchar(255) NOT NULL,
            perUsuId int(11) NOT NULL,
            created_at timestamp NOT NULL DEFAULT current_timestamp(),
            updated_at datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
          ) 
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
        drop table tblperfil
        `)
    }

}
