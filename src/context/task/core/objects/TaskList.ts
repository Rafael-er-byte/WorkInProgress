import ID from "../../../../shared/core/objects/ID";
import Text from "../../../../shared/core/objects/Text";
import ValueObject from "../../../../shared/core/objects/ValueObject";

export default class TaskList extends ValueObject{
    private id!: ID;
    private name!:Text;

    constructor(id:ID, name:Text){
        super();
        this.id = id;
        this.name = name;
    }

    public getID():ID{
        return this.id;
    }

    public getName():Text{
        return this.name;
    }
};
