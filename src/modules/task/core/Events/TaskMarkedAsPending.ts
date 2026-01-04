import type Contributor from "../../../../shared/core/objects/Contributor";
import TaskEvent from "./TaskEvent";

export default class TaskMarkedAsPending extends TaskEvent{
    constructor(modifier: Contributor){
        super(modifier, 'TASK_MARK_AS_PENDING');
    }
};
