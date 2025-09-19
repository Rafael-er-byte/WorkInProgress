import AppError from "./AppError";

export default class NotFound extends AppError{
    constructor(message:string, public info?:any){
        super(message, 404);
        this.name = 'Not found';
    }
}