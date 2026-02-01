import CoreError from "../../../shared/core/errors/CoreError";

export default class MemberStatusNotSupported extends CoreError{
    constructor(info?: any){
        super("Member status not supported", info);
        Object.setPrototypeOf(this, MemberStatusNotSupported.prototype);
    }
};
