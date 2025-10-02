export default class MissingRequiredParameters extends Error{
    constructor(public message:string, public missing?:any){
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
};
