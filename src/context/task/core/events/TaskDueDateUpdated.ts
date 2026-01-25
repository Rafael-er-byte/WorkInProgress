import DomainEvent from "../../../shared/core/events/DomainEvent";
import type Contributor from "../../../shared/core/objects/Contributor";
import type DateTime from "../../../shared/core/objects/DateTime";
import type IdEntity from "../../../shared/core/objects/IdEntity";

export default class TaskDueDateUpdated extends DomainEvent{
    constructor(date:DateTime, modifier: Contributor, idEntity: IdEntity, newDate: DateTime){
        super(date, modifier, idEntity, 'TASK_DUE_DATE_UPDATED', newDate);
    }
};
