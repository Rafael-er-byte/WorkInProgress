import type Contributor from "../../../../shared/core/objects/Contributor";
import type DateTime from "../../../../shared/core/objects/DateTime";
import type TaskPriority from "../objects/TaskPriority";
import TaskEvent from "./TaskEvent";

export default class PriorityUpdated extends TaskEvent{
    constructor(date:DateTime, modifier: Contributor, newPriority: TaskPriority){
        super(date, modifier, 'PRIORITY_UPDATED', newPriority);
    }
};
