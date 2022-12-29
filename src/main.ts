import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('NODE_SERVER_PORT');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  Logger.log(`Application running on port ${port}`);
}
bootstrap();
