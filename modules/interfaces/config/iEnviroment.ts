export default interface iEnviroment{
    db:{
        host:string;
        name:string;
        user:string;
        port:number;
        password:string;
    }

    token:{
        secretRefresh:string;
        secretAccess:string;
        ttlAccess:number;
        ttlRefresh:number;
        refresh: 'Refresh';
        access: 'Access';
    }

    server:{
        host:string;
        port:number;
    }
};