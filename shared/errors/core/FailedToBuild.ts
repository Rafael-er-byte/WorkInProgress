import CoreError from "./CoreError";

export default class FailedToBuild extends CoreError{
    constructor(public message:string, public missing?:any){
        super(message);
    }
};
