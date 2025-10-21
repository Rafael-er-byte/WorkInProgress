import AppError from "./AppError";

export default class BadRequest extends AppError{
    constructor(message:string, info?:any){
        super(message, 400, info);
        this.name = 'BadRequest';
        Object.setPrototypeOf(this, BadRequest.prototype);
    }
};
