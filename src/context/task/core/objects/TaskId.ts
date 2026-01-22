import ID from "../../../shared/core/objects/ID";

export default class TaskId{
    private id!:ID;

    constructor(id:string){
        this.id = new ID(id);
    }

    public getID():string{
        return this.id.getId();
    }
};
