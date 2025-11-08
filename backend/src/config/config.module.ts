import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import typeorm from '../database/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [typeorm],
    }),
  ],
})
export class AppConfigModule {}
