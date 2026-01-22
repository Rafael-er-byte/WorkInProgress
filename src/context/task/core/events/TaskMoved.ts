import DomainEvent from "../../../shared/core/events/DomainEvent";
import type Contributor from "../../../shared/core/objects/Contributor";
import type DateTime from "../../../shared/core/objects/DateTime";
import type TaskPosition from "../objects/TaskPosition";

export default class TaskMoved extends DomainEvent{
    constructor(date:DateTime, modifier: Contributor, newPosition: TaskPosition){
        super(date, modifier, 'TASK_MOVED', newPosition);
    }
};
