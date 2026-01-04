import InvalidParameters from "../../../../shared/core/errors/InvalidParameters";

export default class TaskCategory{
    private id!:string;

    constructor(id:string){
        if(!id || id.trim().length === 0)throw new InvalidParameters('Invalid id');
        this.id = id;
    }

    public getId():string{
        return this.id;
    }
};
