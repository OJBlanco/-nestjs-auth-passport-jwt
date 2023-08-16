import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm';

export class AddIndexToProductTable1692150360484 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createIndex(
      'product',
      new TableIndex({
        name: 'IDX_PRICE_PRODUCT',
        columnNames: ['price'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('product', 'IDX_PRICE_PRODUCT');
  }
}
