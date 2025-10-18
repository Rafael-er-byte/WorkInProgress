import CoreError from "./CoreError";

export default class InvalidOperation extends CoreError{
    constructor(public message: string, public data?: any){
        super(message);
    }
};
