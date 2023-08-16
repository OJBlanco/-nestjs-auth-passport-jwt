import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterOrderTable1691545489219 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('order', 'issue_date');

    await queryRunner.addColumn(
      'order',
      new TableColumn({
        name: 'createAt',
        type: 'timestamptz',
        default: 'now()',
      }),
    );

    await queryRunner.addColumn(
      'order',
      new TableColumn({
        name: 'updateAt',
        type: 'timestamptz',
        default: 'now()',
      }),
    );

    await queryRunner.addColumn(
      'order',
      new TableColumn({
        name: 'customerId',
        type: 'int',
      }),
    );

    await queryRunner.createForeignKey(
      'order',
      new TableForeignKey({
        columnNames: ['customerId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'customer',
        onDelete: 'NO ACTION',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'order',
      new TableColumn({
        name: 'issue_date',
        type: 'date',
        isNullable: false,
      }),
    );
    await queryRunner.dropColumn('order', 'createAt');
    await queryRunner.dropColumn('order', 'updateAt');

    const table = await queryRunner.getTable('order');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('customerId') !== -1,
    );
    await queryRunner.dropForeignKey('order', foreignKey);
    await queryRunner.dropColumn('order', 'customerId');
  }
}
