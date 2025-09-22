export default class AppError extends Error{
    constructor(message: string = 'Server error', public code: number = 500){
        super(message);

        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
};