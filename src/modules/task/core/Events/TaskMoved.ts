import type Contributor from "../../../../shared/core/objects/Contributor";
import type DateTime from "../../../../shared/core/objects/DateTime";
import TaskEvent from "./TaskEvent";

export default class TaskMoved extends TaskEvent{
    constructor(date:DateTime, modifier: Contributor, nameNewList: string){
        super(date, modifier, 'TASK_MOVED', nameNewList);
    }
};
