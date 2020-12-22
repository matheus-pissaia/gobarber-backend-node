import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1599714251452 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criação de Tabela com nome de 'users' e suas respectivas colunas:
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            // Coluna do ID com a função para gerar o id único
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            // Coluna do nome do usuário
            name: 'name',
            type: 'varchar',
          },
          {
            // Coluna do email
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            // Coluna da senha
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Método 'down' que remove a Tabela de dados
    await queryRunner.dropTable('users');
  }
}
