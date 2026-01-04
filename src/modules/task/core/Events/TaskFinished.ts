import type Contributor from "../../../../shared/core/objects/Contributor";
import TaskEvent from "./TaskEvent";

export default class TaskFinished extends TaskEvent{
    constructor(modifier: Contributor){
        super(modifier, 'TASK_FINISHED');
    }
};
