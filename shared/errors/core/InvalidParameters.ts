import CoreError from "./CoreError";

export default class InvalidParameters extends CoreError{
    constructor(public message:string, public missing?:any){
        super(message);
    }
};
