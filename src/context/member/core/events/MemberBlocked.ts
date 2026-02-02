import DomainEvent from "../../../shared/core/events/DomainEvent";
import type DateTime from "../../../shared/core/objects/DateTime";
import type IdEntity from "../../../shared/core/objects/IdEntity";
import type Member from "../model/Member";
import type IdMember from "../objects/IdMember";

export default class MemberBlocked extends DomainEvent{
    constructor(date:DateTime, modifier: Member, idProject:IdEntity ,idEntity: IdMember){
        super(date, modifier, idProject, idEntity, 'MEMBER_BLOCKED');
    }
};
