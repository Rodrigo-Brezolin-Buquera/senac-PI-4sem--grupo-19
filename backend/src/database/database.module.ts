import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './data-source';

@Module({
  imports: [
    ConfigModule.forFeature(typeorm),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const options = configService.get<TypeOrmModuleOptions>('typeorm');
        if (!options) throw new Error('TypeOrmModuleOptions not found');
        return options;
      },
    }),
  ],
})
export class DatabaseModule {}
