import CoreError from "./CoreError";

export default class UnavailableOperation extends CoreError{
    constructor(message: string, info?: unknown){
        super(message, info);
        Object.setPrototypeOf(this, UnavailableOperation.prototype);
    }
};
