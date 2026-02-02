import type Member from "../../../member/core/model/Member";
import DomainEvent from "../../../shared/core/events/DomainEvent";
import type DateTime from "../../../shared/core/objects/DateTime";
import type IdEntity from "../../../shared/core/objects/IdEntity";
import type TaskPriority from "../objects/TaskPriority";

export default class TaskPriorityUpdated extends DomainEvent{
    constructor(date:DateTime, modifier: Member, idProject: IdEntity, idEntity: IdEntity, newPriority: TaskPriority){
        super(date, modifier, idProject, idEntity, 'TASK_PRIORITY_UPDATED', newPriority);
    }
};
