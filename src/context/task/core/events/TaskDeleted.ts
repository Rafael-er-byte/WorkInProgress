import DomainEvent from "../../../shared/core/events/DomainEvent";
import type Contributor from "../../../shared/core/objects/Contributor";
import type DateTime from "../../../shared/core/objects/DateTime";
import type TaskId from "../objects/TaskId";

export default class TaskDeleted extends DomainEvent{
    constructor(date:DateTime, modifier: Contributor, taskid: TaskId){
        super(date, modifier, taskid,  'TASK_DELETED', taskid);
    }
};
