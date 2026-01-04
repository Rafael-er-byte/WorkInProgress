import type Contributor from "../../../../shared/core/objects/Contributor";
import TaskEvent from "./TaskEvent";

export default class PriorityUpdated extends TaskEvent{
    constructor(modifier: Contributor, newPriority: string){
        super(modifier, 'PRIORITY_UPDATED', newPriority);
    }
};
