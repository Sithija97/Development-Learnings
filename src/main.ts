import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

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

  const port = process.env.PORT ?? 3003;
  await app.listen(port);
  console.log(`🚀 Application running on: http://localhost:${port}/api/v1`);
}
bootstrap();
