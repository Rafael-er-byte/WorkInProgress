export default interface iEnviroment{
    db:{
        host:string;
        name:string;
        user:string;
        port:number;
        password:string;
    }

    verificationCode:{
        ttl:number;
    }

    token:{
        secretRefresh:string;
        secretAccess:string;
        secretPermission:string;
        ttlAccess:number;
        ttlRefresh:number;
        ttlPermission:number;
        permission: 'Permission'
        refresh: 'Refresh';
        access: 'Access';
    }

    server:{
        host:string;
        port:number;
    }
};
