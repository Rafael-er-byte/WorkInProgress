import DomainEvent from "../../../shared/core/events/DomainEvent";
import type Contributor from "../../../shared/core/objects/Contributor";
import type DateTime from "../../../shared/core/objects/DateTime";

export default class TaskDueDateUpdated extends DomainEvent{
    constructor(date:DateTime, modifier: Contributor, newDate: DateTime){
        super(date, modifier, 'TASK_DUE_DATE_UPDATED', newDate);
    }
};
