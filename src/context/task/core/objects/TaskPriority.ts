import ValueObject from "../../../shared/core/objects/ValueObject";
import TaskPriorityNorSupported from "../error/TaskPriorityNotSupported";
import { PRIORITY_LEVEL, type Priority } from "../types/Prioroty.type";

export default class TaskPriority extends ValueObject{ 
    private priority!: Priority;

    constructor(priority: Priority){
        super();
        if(!PRIORITY_LEVEL.includes(priority))throw new TaskPriorityNorSupported(priority);
        this.priority = priority;
    }

    public getPriority():Priority{
        return this.priority;
    }
};
