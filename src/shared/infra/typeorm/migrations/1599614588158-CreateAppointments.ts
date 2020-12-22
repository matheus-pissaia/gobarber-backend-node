import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1599614588158
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criação de Tabela com nome de 'appointments' e suas respectivas colunas:
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
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
            // Coluna do Provider ou o Barbeiro
            name: 'provider',
            type: 'varchar',
          },
          {
            // Coluna da Data
            name: 'date',
            type: 'timestamp with time zone',
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
    await queryRunner.dropTable('appointments');
  }
}
