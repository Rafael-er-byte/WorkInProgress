import type ID from "./ID";
import type Text from "./Text";
import ValueObject from "./ValueObject";

export default class Contributor extends ValueObject{
    private id!: ID;
    private userName!: Text;

    constructor(id:ID, userName:Text){
        super();
        this.id = id;
        this.userName = userName;
    }

    public getId():ID{
        return this.id;
    }

    public getUserName(): Text{
        return this.userName;
    }
};
