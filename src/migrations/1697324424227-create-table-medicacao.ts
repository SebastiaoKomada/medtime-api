import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateTableMedicacao1697324424227 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
        CREATE TABLE tblmedicacao (
            medId int(50) PRIMARY KEY AUTO_INCREMENT,
            medNome varchar(100) NOT NULL,
            medForma varchar(255) NOT NULL,
            medQuantidade int(5) NOT NULL,
            medDataInicio date NOT NULL,
            medDataFim date,
            medPerID int(50) NOT NULL,
            created_at timestamp NOT NULL DEFAULT current_timestamp(),
            updated_at datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
          )

        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
        drop table tblmedicacao
        `)
    }

}
