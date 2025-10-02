import CoreError from "./CoreError";

export default class InvalidParameters extends CoreError{
    constructor(public isInvalid:string, public info?:any){
        super(isInvalid);
    }
};
