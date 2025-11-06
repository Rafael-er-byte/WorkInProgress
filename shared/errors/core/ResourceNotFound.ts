import CoreError from "./CoreError";

export default class ResourceNotFoud extends CoreError{
    constructor(message: string, info: any){
        super(message, info);
        Object.setPrototypeOf(this, ResourceNotFoud.prototype);
    }
};
