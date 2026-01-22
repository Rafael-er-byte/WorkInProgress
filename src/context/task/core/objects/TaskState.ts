import InvalidParameters from "../../../../shared/core/errors/InvalidParameters";
import ValueObject from "../../../../shared/core/objects/ValueObject";
import { ALLOWED_TASK_STATE, type AllowedTaskState } from "../types/AllowedTaskState.type";

export default class TaskState extends ValueObject{
    private state!: AllowedTaskState;
    
    constructor(state: AllowedTaskState){
        super();

        if(!ALLOWED_TASK_STATE.includes(state)) throw new InvalidParameters("Task state no supported", state);
        this.state = state;
    }

    public isCompleted(): boolean{
        if(this.state === ALLOWED_TASK_STATE[0])return true;
        return false;
    }
};
