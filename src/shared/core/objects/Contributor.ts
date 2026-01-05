import type ID from "./ID";
import type Text from "./Text";

export default class Contributor{
    private id!: ID;
    private userName!: Text;

    constructor(id:ID, userName:Text){
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
