import type IdMember from "../../../member/core/objects/IdMember";
import type MemberInfo from "../../../member/core/objects/MemberInfo";
import type Attachment from "../../../shared/core/objects/Attachment";
import ValueObject from "../../../shared/core/objects/ValueObject";

export default class MemberNoteInfo extends ValueObject{
    private id!: IdMember;
    private info!: MemberInfo;
    
    constructor(id: IdMember, info: MemberInfo){
        super();
        this.id = id;
        this.info = info;
    }

    public getId(): string{
        return this.id.getID();
    }

    public getUserName(): string{
        return this.info.getUserName();
    }

    public getUrlProfileImage(): Attachment{
        return this.info.getUrlProfileImage();
    }
};
