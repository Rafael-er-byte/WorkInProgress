import type Member from "../../../member/core/model/Member";
import DomainEvent from "../../../shared/core/events/DomainEvent";
import type DateTime from "../../../shared/core/objects/DateTime";
import type IdEntity from "../../../shared/core/objects/IdEntity";

export default class TaskMemberAdded extends DomainEvent{
    constructor(date:DateTime, modifier: Member, idProject:IdEntity, idEntity: IdEntity, contributor: Member){
        super(date, modifier, idProject, idEntity, 'TASK_MEMBER_ADDED', contributor);
    }
};
