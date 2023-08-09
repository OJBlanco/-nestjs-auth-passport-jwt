import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddDatesAtToBrand1685926975285 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'brand',
      new TableColumn({
        name: 'createAt',
        type: 'timestamptz',
        default: 'now()',
      }),
    );

    await queryRunner.addColumn(
      'brand',
      new TableColumn({
        name: 'updateAt',
        type: 'timestamptz',
        default: 'now()',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('brand', 'createAt');
    await queryRunner.dropColumn('brand', 'updateAt');
  }
}
