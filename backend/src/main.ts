import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { helmetConfig } from './common/helmet/config';
import { validationPipeConfig } from './common/pipes/validation.config';
import { DataSource } from 'typeorm';
import { runInitialSeed } from './database/seeds/initial.seed';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  app.getHttpAdapter().getInstance().disable('x-powered-by');
  app.useGlobalPipes(new ValidationPipe(validationPipeConfig));
  app.use(helmetConfig);
  app.enableCors();
  app.enableVersioning();

  const dataSource = app.get(DataSource);
  await runInitialSeed(dataSource);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
