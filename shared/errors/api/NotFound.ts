import AppError from "./AppError";

export default class NotFound extends AppError{
    constructor(message:string, info?:any){
        super(message, 404, info);
        this.name = 'Not found';
        Object.setPrototypeOf(this, NotFound.prototype);
    }
}