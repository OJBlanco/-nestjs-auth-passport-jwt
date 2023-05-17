import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import config from '../config';

const configService = config();

console.log('>>> ', configService.postgres.user);

export default new DataSource({
  type: 'postgres',
  username: 'root',
  password: 'admin1994',
  database: 'my_db',
  port: 5432,
  host: 'localhost',
  synchronize: false,
  logging: true,
  entities: ['src/**/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
});
