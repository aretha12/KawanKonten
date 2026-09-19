import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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