import { registerAs } from "@nestjs/config";
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";
import { ConfigService } from '@nestjs/config';

config();
const configService = new ConfigService();

const configData = {
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    entities: ["dist/entities/*.entity{.ts,.js}"],
    migrations: ["dist/migrations/*{.ts,.js}"],
    autoLoadEntities: true,
    synchronize: false,
}

export default registerAs('typeorm', () => configData)
export const connectionSource = new DataSource(configData as DataSourceOptions);