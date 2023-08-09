import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddForeignkeyToProduct1685927931853 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'product',
      new TableColumn({
        name: 'brandId',
        type: 'int',
      }),
    );

    await queryRunner.createForeignKey(
      'product',
      new TableForeignKey({
        columnNames: ['brandId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'brand',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('product');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('brandId') !== -1,
    );
    await queryRunner.dropForeignKey('product', foreignKey);
    await queryRunner.dropColumn('product', 'brandId');
  }
}
