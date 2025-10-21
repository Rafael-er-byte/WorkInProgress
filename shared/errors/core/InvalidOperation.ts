import CoreError from "./CoreError";

export default class InvalidOperation extends CoreError{
    constructor(message: string, data?: any){
        super(message, data);
        Object.setPrototypeOf(this, InvalidOperation.prototype);
    }
};
