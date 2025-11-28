import CoreError from "./CoreError";

export default class Unauthorized extends CoreError{
    constructor(message: string, info?: any){
        super(message, info);
        Object.setPrototypeOf(this, Unauthorized.prototype);
    }
};
