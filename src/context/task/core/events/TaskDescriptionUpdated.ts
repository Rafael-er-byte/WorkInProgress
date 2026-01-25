import DomainEvent from "../../../shared/core/events/DomainEvent";
import type Contributor from "../../../shared/core/objects/Contributor";
import type DateTime from "../../../shared/core/objects/DateTime";
import type IdEntity from "../../../shared/core/objects/IdEntity";

export default class TaskDescriptionUpdated extends DomainEvent{
    constructor(date:DateTime, modifier: Contributor, idEntity: IdEntity, newDescription: string){
        super(date, modifier, idEntity, 'TASK_DESCRIPTION_UPDATED', newDescription);
    }
};
