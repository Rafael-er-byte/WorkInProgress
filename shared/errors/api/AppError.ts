export default class AppError extends Error{
    constructor(message: string = 'Server error', public code: number = 500, public info?: any){
        super(message);

        Object.setPrototypeOf(this, new.target.prototype);
        if(Error.captureStackTrace){
            Error.captureStackTrace(this, new.target);
        }
    }
};
