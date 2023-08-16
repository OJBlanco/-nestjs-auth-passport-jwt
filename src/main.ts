import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Configuración Swagger en NestJS
  const config = new DocumentBuilder()
    .setTitle('Platzi API')
    .setDescription('Documentación Platzi API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // URL API
  SwaggerModule.setup('docs', app, document);
  // TODO: Investigar como configurar mejor los CORS para delimitar el acceso a solo el frontend o app movil
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
