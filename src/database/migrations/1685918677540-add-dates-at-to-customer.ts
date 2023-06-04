import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddDatesAtToCustomer1685918677540 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'customer',
      new TableColumn({
        name: 'createAt',
        type: 'timestamptz',
        default: 'now()',
      }),
    );

    await queryRunner.addColumn(
      'customer',
      new TableColumn({
        name: 'updateAt',
        type: 'timestamptz',
        default: 'now()',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('customer', 'createAt');
    await queryRunner.dropColumn('customer', 'updateAt');
  }
}
