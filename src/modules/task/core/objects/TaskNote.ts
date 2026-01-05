import type ID from "../../../../shared/core/objects/ID";

export default class TaskNote{
    private id!:ID;

    constructor(id: ID){
        this.id = id;
    }

    public getId():ID{
        return this.id;
    }
};
