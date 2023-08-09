import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddDatesAtToCategory1691111705189 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'category',
      new TableColumn({
        name: 'createAt',
        type: 'timestamptz',
        default: 'now()',
      }),
    );

    await queryRunner.addColumn(
      'category',
      new TableColumn({
        name: 'updateAt',
        type: 'timestamptz',
        default: 'now()',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('category', 'createAt');
    await queryRunner.dropColumn('category', 'updateAt');
  }
}
