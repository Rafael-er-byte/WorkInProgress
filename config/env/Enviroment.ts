import dotenv from 'dotenv';
import type iEnviroment from '../../modules/interfaces/config/iEnviroment';
dotenv.config();

export default class Enviroment implements iEnviroment{
    db = {
        host:process.env.DB_HOST as string,
        name:process.env.DB_NAME as string,
        user:process.env.DB_USER as string,
        port:process.env.DB_PORT as number,
        password:process.env.DB_PWD as string
    };

    token = {
        secretRefresh: process.env.SECRET_REFRESH as string,
        secretAccess: process.env.SECRET_ACCESS as string,
        ttlAccess: process.env.TTL_ACCESS as number,
        ttlRefresh: process.env.TTL_REFRESH as number,
        refresh: 'Refresh',
        access: 'Access'
    };

    server = {
        host: process.env.HOST as string,
        port: process.env.PORT as number
    };
};