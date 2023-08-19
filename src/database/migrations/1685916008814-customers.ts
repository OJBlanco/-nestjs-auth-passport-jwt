import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Customers1685916008814 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'customer',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '60',
          },
          {
            name: 'lastName',
            type: 'varchar',
            length: '80',
          },
          {
            name: 'phone',
            type: 'varchar',
            length: '16',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('customer');
  }
}
