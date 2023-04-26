import { Module, Global } from '@nestjs/common';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: '123456',
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
