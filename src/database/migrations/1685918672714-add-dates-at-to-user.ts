import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddDatesAtToUser1685918672714 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'createAt',
        type: 'timestamptz',
        default: 'now()',
      }),
    );

    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'updateAt',
        type: 'timestamptz',
        default: 'now()',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'createAt');
    await queryRunner.dropColumn('user', 'updateAt');
  }
}
