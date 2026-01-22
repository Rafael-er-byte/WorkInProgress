import DomainEvent from "../../../shared/core/events/DomainEvent";
import type Contributor from "../../../shared/core/objects/Contributor";
import type DateTime from "../../../shared/core/objects/DateTime";

export default class TaskTitleUpdated extends DomainEvent{
    constructor(date:DateTime, modifier: Contributor, newTitle:string){
        super(date, modifier, 'TASK_TITLE_UPDATED', newTitle);
    }
};
