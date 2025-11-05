import AppError from "./AppError";

export default class ServiceUnavailable extends AppError{
    public name!:string;
    constructor(message:string, info?:any){
        super(message, 503, info);
        this.name = 'Service Unavailable';

        Object.setPrototypeOf(this, ServiceUnavailable.prototype);
    }
};
