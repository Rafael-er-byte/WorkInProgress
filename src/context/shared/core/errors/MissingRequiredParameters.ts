import CoreError from "./CoreError";

export default class MissingRequiredParameters extends CoreError{
    constructor(message:string, missing?:any){
        super(message, missing);
        Object.setPrototypeOf(this, MissingRequiredParameters.prototype);
    }
};
