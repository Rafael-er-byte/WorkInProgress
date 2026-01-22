import InvalidParameters from "../errors/InvalidParameters";
import ValueObject from "./ValueObject";

export default class IntNumber extends ValueObject{
    private value!:number;

    constructor(value:number){
        super();
        if(!(typeof value === "number"))throw new InvalidParameters(' must be a number');
        const isDecimal = value - Math.trunc(value) > 0;
        if(isDecimal)throw new InvalidParameters('Number must be integer');
        this.value = value;
    }

    public getValue(): number{
        return this.value;
    }
};
