export default class CoreError extends Error{
    public info?:any;

    constructor(message:string, info:any){
        super(message);
        this.info = info;

        Object.setPrototypeOf(this, new.target.prototype);
        if(Error.captureStackTrace){
            Error.captureStackTrace(this, new.target);
        }
    }
};
