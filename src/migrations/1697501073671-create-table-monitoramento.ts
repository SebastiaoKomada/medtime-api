import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableMonitoramento1697501073671 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE tblmonitoramento (
                monId int NOT NULL AUTO_INCREMENT PRIMARY KEY,
                monPerId int NOT NULL,
                monSintomas varchar(40) NOT NULL,
                monData date NOT NULL,
                monHora time NOT NULL,
                created_at timestamp NOT NULL DEFAULT current_timestamp(),
                updated_at timestamp DEFAULT current_timestamp() ON UPDATE current_timestamp()
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE tblMonitoramento");
    }
}

