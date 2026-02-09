import CoreError from "../../../shared/core/errors/CoreError";

export default class MemberUserNameIsTooLarge extends CoreError{
    constructor(info?: unknown){
        super("Member username is too large", info);
        Object.setPrototypeOf(this, MemberUserNameIsTooLarge.prototype);
    }
};
