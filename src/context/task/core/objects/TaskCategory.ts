import type ID from "../../../../shared/core/objects/ID";
import ValueObject from "../../../../shared/core/objects/ValueObject";

export default class TaskCategory extends ValueObject{
    private id!:ID;

    constructor(id:ID){
        super();
        this.id = id;
    }

    public getId():ID{
        return this.id;
    }
};
