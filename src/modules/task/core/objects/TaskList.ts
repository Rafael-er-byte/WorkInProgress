import ID from "../../../../shared/core/objects/ID";
import Text from "../../../../shared/core/objects/Text";

export default class TaskList{
    private id!: ID;
    private name!:Text;

    constructor(id:ID, name:Text){
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
