import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties not in the DTO
      forbidNonWhitelisted: true, // Throw error if extra properties are sent
      transform: true, // Auto-convert types (string "1" → number 1)
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Todo API')
    .setDescription('Industry-standard Todo REST API built with NestJS')
    .setVersion('1.0')
    .addTag('todos')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT ?? 3003;
  await app.listen(port);
  console.log(`🚀 Application running on: http://localhost:${port}/api/v1`);
}
bootstrap();
