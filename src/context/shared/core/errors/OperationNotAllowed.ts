import CoreError from "./CoreError";

export default class OperationNotAllowed extends CoreError{
    constructor(message: string, info?: any){
        super(message, info);
        Object.setPrototypeOf(this, OperationNotAllowed);
    }
};
