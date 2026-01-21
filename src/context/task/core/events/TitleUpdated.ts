import DomainEvent from "../../../../shared/core/events/DomainEvent";
import type Contributor from "../../../../shared/core/objects/Contributor";
import type DateTime from "../../../../shared/core/objects/DateTime";
import type Text from "../../../../shared/core/objects/Text";

export default class TaskTitleUpdated extends DomainEvent{
    constructor(date:DateTime, modifier: Contributor, newTitle:Text){
        super(date, modifier, 'TASK_TITLE_UPDATED', newTitle);
    }
};
