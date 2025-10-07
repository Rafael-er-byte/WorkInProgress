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

    verificationCode = {
        ttl:120
    };

    token = {
        secretRefresh: process.env.SECRET_REFRESH as string,
        secretAccess: process.env.SECRET_ACCESS as string,
        secretPermission: process.env.SECRET_PERMISSION as string,
        ttlAccess: process.env.TTL_ACCESS as number,
        ttlRefresh: process.env.TTL_REFRESH as number,
        ttlPermission: process.env.TTL_PERMISSION as number,
        refresh: 'Refresh',
        access: 'Access',
        permission: 'Permission'
    };

    server = {
        host: process.env.HOST as string,
        port: process.env.PORT as number
    };
};