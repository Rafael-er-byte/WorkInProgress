import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type:"postgres",
    host: String(process.env.DB_HOST),
    port: Number(process.env.DB_PORT) || 5432,
    username:String(process.env.DB_USER),
    password:String(process.env.PWD),
    database:String(process.env.DB_NAME),
    synchronize: true,
    logging: false,
    entities: []
}) ;