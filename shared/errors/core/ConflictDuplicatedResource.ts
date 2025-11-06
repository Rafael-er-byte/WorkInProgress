import CoreError from "./CoreError";

export default class ConflictDuplicateResource extends CoreError{
    constructor(message: string, info: any){
        super(message, info);
        Object.setPrototypeOf(this, ConflictDuplicateResource.prototype);
    }
};
