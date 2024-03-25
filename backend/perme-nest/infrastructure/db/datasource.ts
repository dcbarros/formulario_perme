import { ConfigService } from '@nestjs/config';
import {DataSource, DataSourceOptions} from 'typeorm';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: configService.get('DATABASE_HOST'),
    port: Number(configService.get('DATABASE_PORT')),
    username: configService.get('DATABASE_USER'),
    password: configService.get('DATABASE_PASS'),
    database: String(configService.get('DATABASE_NAME')),
    synchronize: false,
    migrationsRun: true,
    dropSchema: false,
    entities: ['dist/src/**/*.entity.js'],
    migrations: ['dist/infrastructure/db/migrations/*.js'],
}

export default new DataSource(dataSourceOptions);