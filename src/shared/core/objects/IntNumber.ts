import InvalidParameters from "../errors/InvalidParameters";
import ValueObject from "./ValueObject";

export default class IntNumber extends ValueObject{
    private value!:number;

    constructor(value:number){
        super();
        if(!(typeof value === "number"))throw new InvalidParameters('Value must be a number');
        this.value = value;
    }

    public getValue(): number{
        return this.value;
    }
};
