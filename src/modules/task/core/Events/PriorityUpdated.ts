import type Contributor from "../../../../shared/core/objects/Contributor";
import type DateTime from "../../../../shared/core/objects/DateTime";
import TaskEvent from "./TaskEvent";

export default class PriorityUpdated extends TaskEvent{
    constructor(date:DateTime, modifier: Contributor, newPriority: string){
        super(date, modifier, 'PRIORITY_UPDATED', newPriority);
    }
};
