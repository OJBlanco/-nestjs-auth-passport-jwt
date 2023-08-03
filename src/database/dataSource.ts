import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  username: 'root',
  password: 'root',
  database: 'my_db',
  port: 5432,
  host: 'localhost',
  synchronize: false,
  logging: true,
  entities: ['src/**/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
});
