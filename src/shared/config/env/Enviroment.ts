import dotenv from 'dotenv';
dotenv.config();

export default class Enviroment{
    db = {
        host:process.env.DB_HOST as string,
        name:process.env.DB_NAME as string,
        user:process.env.DB_USER as string,
        port:Number(process.env.DB_PORT),
        password:process.env.DB_PWD as string
    };

    verificationCode = {
        ttl:120
    };

    token = {
        secretRefresh: process.env.SECRET_REFRESH as string,
        secretAccess: process.env.SECRET_ACCESS as string,
        secretPermission: process.env.SECRET_PERMISSION as string,
        ttlAccess: Number(process.env.TTL_ACCESS),
        ttlRefresh: Number(process.env.TTL_REFRESH),
        ttlPermission: Number(process.env.TTL_PERMISSION),
        refresh: 'Refresh',
        access: 'Access',
        permission: 'Permission'
    };

    server = {
        host: process.env.HOST as string,
        port: Number(process.env.PORT)
    };
};