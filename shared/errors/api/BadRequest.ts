import AppError from "./AppError";

export default class BadRequest extends AppError{
    constructor(message:string, public info?:any){
        super(message, 400);
        this.name = 'BadRequest';
    }
};
