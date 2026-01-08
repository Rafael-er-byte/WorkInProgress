import type Text from "./Text";
import ValueObject from "./ValueObject";

export default class ID extends ValueObject{
    private id!:Text;

    constructor(id:Text){
        super();
        this.id = id; 
    }

    public getId(): Text{
        return this.id;
    }
};
