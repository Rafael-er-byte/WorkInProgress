import InvalidParameters from "../../../../shared/core/errors/InvalidParameters";
import ValueObject from "../../../../shared/core/objects/ValueObject";
import { PRIORITY_LEVEL, type Priority } from "../types/Prioroty.type";

export default class TaskPriority extends ValueObject{ 
    private priority!: Priority;

    constructor(priority: Priority){
        super();
        if(!PRIORITY_LEVEL.includes(priority))throw new InvalidParameters('The parameter is nt allowed like a priority type', priority);
        this.priority = priority;
    }

    public getPriority():Priority{
        return this.priority;
    }
};
