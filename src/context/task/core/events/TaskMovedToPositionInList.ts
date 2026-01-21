import DomainEvent from "../../../../shared/core/events/DomainEvent";
import type Contributor from "../../../../shared/core/objects/Contributor";
import type DateTime from "../../../../shared/core/objects/DateTime";
import type IntNumber from "../../../../shared/core/objects/IntNumber";

export default class TaskMovedToPositionInList extends DomainEvent{
    constructor(date:DateTime, modifier: Contributor, newPosition: IntNumber){
        super(date, modifier, 'TASK_MOVED_TO_POSITION_IN_LIST', newPosition);
    }
};
