import type ID from "../../../shared/core/objects/ID";
import ValueObject from "../../../shared/core/objects/ValueObject";

export default class TaskCategory extends ValueObject{
    private id!:ID;
    private name!:Text

    constructor(id:ID, name:Text){
        super();
        this.id = id;
        this.name = name;
    }

    public getId():ID{
        return this.id;
    }

    public getName(): Text{
        return this.name;
    }
};
