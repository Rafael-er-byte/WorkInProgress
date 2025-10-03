import CoreError from "./CoreError";

export default class MissingRequiredParameters extends CoreError{
    constructor(public message:string, public missing?:any){
        super(message);
    }
};
