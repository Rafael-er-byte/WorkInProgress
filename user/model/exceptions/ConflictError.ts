import AppError from "../../../shared/exceptions/AppError";

export default class ConflictError extends AppError{
    constructor(message:string, public info?:any){
        super(message, 409);
        this.name = 'ConflictError';
    }
};