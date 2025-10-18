import CoreError from "./CoreError";

export default class InvalidOperation extends CoreError{
    constructor(public message: string, public error?: any){
        super(message);
    }
};
