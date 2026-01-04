import type Contributor from "../objects/Contributor";
import TaskEvent from "./TaskEvent";

export default class TaskMarkedAsPEnding extends TaskEvent{
    constructor(modifier: Contributor){
        super(modifier, 'TASK_MARK_AS_PENDING');
    }
};
