import CoreError from "../../../shared/core/errors/CoreError";

export default class MemberProfileImageIsTooLarge extends CoreError{
    constructor(info?: unknown){
        super("Member profile images is too large", info);
        Object.setPrototypeOf(this, MemberProfileImageIsTooLarge.prototype);
    }
};
