import AppError from "./AppError";

export default class Unauthorized extends AppError{
    constructor(message:string, public info?:any){
        super(message, 401);
        this.name = 'Unauthorized';
    }
};