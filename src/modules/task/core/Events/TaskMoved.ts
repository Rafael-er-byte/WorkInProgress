import type Contributor from "../objects/Contributor";
import TaskEvent from "./TaskEvent";

export default class TaskMoved extends TaskEvent{
    constructor(modifier: Contributor, nameNewList: string){
        super(modifier, 'TASK_MOVED', nameNewList);
    }
};
