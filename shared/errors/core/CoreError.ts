export default class CoreError extends Error{
    constructor(public message:string){
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
};
