import DomainEvent from "../../../../shared/core/events/DomainEvent";
import type Contributor from "../../../../shared/core/objects/Contributor";
import type DateTime from "../../../../shared/core/objects/DateTime";

export default class TaskBackgroundImageDeleted extends DomainEvent{
    constructor(date:DateTime, modifier: Contributor){
        super(date, modifier, 'TASK_BACKGROUND_IMAGE_DELETED');
    }
};
