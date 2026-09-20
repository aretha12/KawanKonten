import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Aktifkan validasi DTO (class-validator)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Sajikan folder public/ (berisi kawankonten.html)
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // Konfigurasi tampilan antarmuka web (Swagger)
  const config = new DocumentBuilder()
    .setTitle('KawanKonten Platform')
    .setDescription('Dokumentasi & Antarmuka Uji Coba KawanKonten API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();