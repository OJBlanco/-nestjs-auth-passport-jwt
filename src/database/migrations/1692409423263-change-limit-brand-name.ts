import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeLimitBrandName1692409423263 implements MigrationInterface {
  name = 'ChangeLimitBrandName1692409423263';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customer" DROP CONSTRAINT "FK_3f62b42ed23958b120c235f74df"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_categories_category" DROP CONSTRAINT "FK_15520e638eb4c46c4fb2c61c4b4"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_PRICE_PRODUCT"`);
    await queryRunner.query(
      `ALTER TABLE "product_categories_category" ADD CONSTRAINT "PK_17f2a361443184000ee8d79f240" PRIMARY KEY ("categoryId", "productId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "brandId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" DROP CONSTRAINT "UQ_5f468ae5696f07da025138e38f7"`,
    );
    await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "brand" ADD "name" character varying(120) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" ADD CONSTRAINT "UQ_5f468ae5696f07da025138e38f7" UNIQUE ("name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" DROP CONSTRAINT "FK_904370c093ceea4369659a3c810"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" ALTER COLUMN "productId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" ALTER COLUMN "orderId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_124456e637cca7a415897dce659"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ALTER COLUMN "customerId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ADD CONSTRAINT "UQ_3f62b42ed23958b120c235f74df" UNIQUE ("userId")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b3234b06e4d16f52b384dfa4dd" ON "product" ("price") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_15520e638eb4c46c4fb2c61c4b" ON "product_categories_category" ("categoryId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_342d06dd0583aafc156e076379" ON "product_categories_category" ("productId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" ADD CONSTRAINT "FK_904370c093ceea4369659a3c810" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_124456e637cca7a415897dce659" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ADD CONSTRAINT "FK_3f62b42ed23958b120c235f74df" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_categories_category" ADD CONSTRAINT "FK_15520e638eb4c46c4fb2c61c4b4" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_categories_category" DROP CONSTRAINT "FK_15520e638eb4c46c4fb2c61c4b4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" DROP CONSTRAINT "FK_3f62b42ed23958b120c235f74df"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_124456e637cca7a415897dce659"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" DROP CONSTRAINT "FK_904370c093ceea4369659a3c810"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_342d06dd0583aafc156e076379"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_15520e638eb4c46c4fb2c61c4b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b3234b06e4d16f52b384dfa4dd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" DROP CONSTRAINT "UQ_3f62b42ed23958b120c235f74df"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ALTER COLUMN "customerId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_124456e637cca7a415897dce659" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" ALTER COLUMN "orderId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" ALTER COLUMN "productId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" ADD CONSTRAINT "FK_904370c093ceea4369659a3c810" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" DROP CONSTRAINT "UQ_5f468ae5696f07da025138e38f7"`,
    );
    await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "brand" ADD "name" character varying(60) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" ADD CONSTRAINT "UQ_5f468ae5696f07da025138e38f7" UNIQUE ("name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "brandId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_categories_category" DROP CONSTRAINT "PK_17f2a361443184000ee8d79f240"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_PRICE_PRODUCT" ON "product" ("price") `,
    );
    await queryRunner.query(
      `ALTER TABLE "product_categories_category" ADD CONSTRAINT "FK_15520e638eb4c46c4fb2c61c4b4" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ADD CONSTRAINT "FK_3f62b42ed23958b120c235f74df" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
