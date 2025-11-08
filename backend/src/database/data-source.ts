import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: Number(5432),
  username: 'user',
  password: 'minha_senha',
  database: 'db',
  entities: [path.resolve(__dirname, '..', '..', '**', '*.entity.js')],
  migrations: [path.resolve(__dirname, '..', 'migrations', '*.js')],
  // para os migrations serem executadas corretamente:
  // entities: ['src/**/*.entity.ts'],
  // migrations: ['src/database/migrations/*.ts'],
  synchronize: true,
  logging: true,
};

export const connectionSource = new DataSource(dataSourceOptions);

export default registerAs('typeorm', () => dataSourceOptions);
