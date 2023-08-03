import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class AddRelationTableCategoryProduct1691029446398
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product_categories_category',
        columns: [
          {
            name: 'productId',
            type: 'int',
          },
          {
            name: 'categoryId',
            type: 'int',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'product_categories_category',
      new TableForeignKey({
        columnNames: ['productId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      }),
    );

    await queryRunner.createForeignKey(
      'product_categories_category',
      new TableForeignKey({
        columnNames: ['categoryId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'category',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('product_categories_category');

    const productKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('productId') !== -1,
    );
    await queryRunner.dropForeignKey('product_categories_category', productKey);
    await queryRunner.dropColumn('product_categories_category', 'productId');

    const categoryKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('categoryId') !== -1,
    );
    await queryRunner.dropForeignKey(
      'product_categories_category',
      categoryKey,
    );
    await queryRunner.dropColumn('product_categories_category', 'categoryId');

    await queryRunner.dropTable('product_categories_category');
  }
}
