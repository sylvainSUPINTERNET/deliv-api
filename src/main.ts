import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// https://medium.com/@1neel.sabne/connect-mongodb-using-prisma-orm-in-nestjs-9ae2e2776de2

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
