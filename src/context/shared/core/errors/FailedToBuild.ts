import CoreError from "./CoreError";

export default class FailedToBuild extends CoreError{
    constructor(message:string, info?:unknown){
        super(message, info);
        Object.setPrototypeOf(this, FailedToBuild.prototype);
    }
};
