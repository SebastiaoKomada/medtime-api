import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateTableConfirmacao1697325296616 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
        CREATE TABLE tblconfirmacao (
            conId int(50) PRIMARY KEY AUTO_INCREMENT,
            conPerId int(50) NOT NULL,
            conMedId int(50) NOT NULL,
            conHorId int(50) NOT NULL,
            conData date NOT NULL,
            created_at timestamp NOT NULL DEFAULT current_timestamp(),
            updated_at datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
          )

        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
        drop table tblconfirmacao
        `)
    }

}
