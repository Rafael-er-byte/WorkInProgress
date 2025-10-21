import CoreError from "./CoreError";

export default class InvalidParameters extends CoreError{
    constructor(isInvalid:string, info?:any){
        super(isInvalid, info);
        Object.setPrototypeOf(this, InvalidParameters.prototype);
    }
};
