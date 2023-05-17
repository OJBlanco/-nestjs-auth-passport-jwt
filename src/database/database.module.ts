import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';

import config from '../config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = configService.postgres;
        // const { user, host, dbName, password, port } = configService.mysql;
        return {
          type: 'postgres', // 'mysql'
          host,
          port,
          username: user,
          password,
          database: dbName,
          synchronize: false,
        };
      },
    }),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
