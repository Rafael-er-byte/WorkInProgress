import ValueObject from "../../../shared/core/objects/ValueObject";
import TaskStateNotSupported from "../error/TaskStateNotSupported";
import { ALLOWED_TASK_STATE, type AllowedTaskState } from "../types/AllowedTaskState";

export default class TaskState extends ValueObject{
    private state!: AllowedTaskState;
    
    constructor(state: AllowedTaskState){
        super();

        if(!ALLOWED_TASK_STATE.includes(state)) throw new TaskStateNotSupported(state);
        this.state = state;
    }

    public isCompleted(): boolean{
        if(this.state === ALLOWED_TASK_STATE[0])return true;
        return false;
    }
};
