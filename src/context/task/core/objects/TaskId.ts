import ID from "../../../../shared/core/objects/ID";

export default class TaskId{
    private id!:ID;

    constructor(id:string){
        this.id = new ID(id);
    }

    static generateTaskId(): TaskId{
        return new TaskId(ID.generateId().getId());
    }

    getID():string{
        return this.id.getId();
    }
};
