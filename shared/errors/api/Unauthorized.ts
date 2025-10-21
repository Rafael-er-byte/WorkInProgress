import AppError from "./AppError";

export default class Unauthorized extends AppError{
    constructor(message:string, info?:any){
        super(message, 401, info);
        this.name = 'Unauthorized';
        Object.setPrototypeOf(this, Unauthorized.prototype);
    }
};
