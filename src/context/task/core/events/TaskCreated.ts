import DomainEvent from "../../../shared/core/events/DomainEvent";
import type Contributor from "../../../shared/core/objects/Contributor";
import type DateTime from "../../../shared/core/objects/DateTime";
import type TaskId from "../objects/TaskId";

export default class TaskCreated extends DomainEvent{
    constructor(date:DateTime, modifier: Contributor, taskId: TaskId){
        super(date, modifier, 'TASK_BACKGROUND_IMAGE_DELETED', taskId);
    }
};
