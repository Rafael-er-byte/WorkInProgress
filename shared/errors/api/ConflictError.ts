import AppError from "./AppError";

export default class ConflictError extends AppError{
    constructor(message:string, info?:any){
        super(message, 409, info);
        this.name = 'ConflictError';
        Object.setPrototypeOf(this, ConflictError.prototype);
    }
};
