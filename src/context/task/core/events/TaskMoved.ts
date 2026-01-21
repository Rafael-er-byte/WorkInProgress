import DomainEvent from "../../../../shared/core/events/DomainEvent";
import type Contributor from "../../../../shared/core/objects/Contributor";
import type DateTime from "../../../../shared/core/objects/DateTime";
import type IntNumber from "../../../../shared/core/objects/IntNumber";
import type Text from "../../../../shared/core/objects/Text";

export default class TaskMoved extends DomainEvent{
    constructor(date:DateTime, modifier: Contributor, nameNewList: Text, positionOnList: IntNumber){
        super(date, modifier, 'TASK_MOVED', nameNewList);
    }
};
