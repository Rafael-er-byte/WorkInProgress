import DomainEvent from "../../../../shared/core/events/DomainEvent";
import type Contributor from "../../../../shared/core/objects/Contributor";
import type DateTime from "../../../../shared/core/objects/DateTime";

export default class TaskDescriptionUpdated extends DomainEvent{
    constructor(date:DateTime, modifier: Contributor, newDescription: string){
        super(date, modifier, 'TASK_DESCRIPTION_UPDATED', newDescription);
    }
};
