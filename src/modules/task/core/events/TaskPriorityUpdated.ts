import DomainEvent from "../../../../shared/core/events/DomainEvent";
import type Contributor from "../../../../shared/core/objects/Contributor";
import type DateTime from "../../../../shared/core/objects/DateTime";
import type TaskPriority from "../objects/TaskPriority";

export default class TaskPriorityUpdated extends DomainEvent{
    constructor(date:DateTime, modifier: Contributor, newPriority: TaskPriority){
        super(date, modifier, 'TASK_PRIORITY_UPDATED', newPriority);
    }
};
