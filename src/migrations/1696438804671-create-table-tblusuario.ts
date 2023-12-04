import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableTblusuario1696438804671 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE tblusuario (
            usuId int(11) PRIMARY KEY AUTO_INCREMENT,
            usuNome varchar(100) NOT NULL,
            usuEmail varchar(255) NOT NULL,
            usuSenha varchar(255) NOT NULL,
            usuTelefone varchar(20) NOT NULL,
            usuTipo int(11) NOT NULL,
            created_at timestamp NOT NULL DEFAULT current_timestamp(),
            updated_at datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
          )

        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        drop table tblusuario
        `);
  }
}
