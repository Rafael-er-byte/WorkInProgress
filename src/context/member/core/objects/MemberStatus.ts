import ValueObject from "../../../shared/core/objects/ValueObject";
import MemberStatusNotSupported from "../error/MemberStatusNotSupported";
import { ALLOWED_MEMBER_STATUS, type AllowedMemberStatus } from "../types/AllowedMemberStatus";

export default class MemberStatus extends ValueObject{
    private status!: AllowedMemberStatus;

    constructor(status: AllowedMemberStatus){
        super();
        if(!ALLOWED_MEMBER_STATUS.includes(status)) throw new MemberStatusNotSupported(status);
        this.status = status;
    }

    public getStatus(): AllowedMemberStatus{
        return this.status;
    }
}