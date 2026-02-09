import CoreError from "../../../shared/core/errors/CoreError";

export default class TaskPriorityNorSupported extends CoreError{
    constructor(info?:unknown){
        super('Task priority not supported', info);
        Object.setPrototypeOf(this, TaskPriorityNorSupported);
    }
};
