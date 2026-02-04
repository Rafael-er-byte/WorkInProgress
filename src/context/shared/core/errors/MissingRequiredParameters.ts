import CoreError from "./CoreError";

export default class MissingRequiredParameters extends CoreError{
    constructor(message:string, missing?:unknown){
        super(message, missing);
        Object.setPrototypeOf(this, MissingRequiredParameters.prototype);
    }
};
