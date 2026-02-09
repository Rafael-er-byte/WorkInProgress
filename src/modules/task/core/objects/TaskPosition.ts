import ID from "../../../shared/core/objects/ID";
import type IntNumber from "../../../shared/core/objects/IntNumber";
import Text from "../../../shared/core/objects/Text";
import ValueObject from "../../../shared/core/objects/ValueObject";

export default class TaskPosition extends ValueObject{
    private id!: ID;
    private name!:Text;
    private positionInList!: IntNumber;

    constructor(id:ID, name:Text, position: IntNumber){
        super();
        this.id = id;
        this.name = name;
        this.positionInList = position;
    }

    public getIDList():ID{
        return this.id;
    }

    public getListName():Text{
        return this.name;
    }

    public getPosition():IntNumber{
        return this.positionInList;
    }
};
