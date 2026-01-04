import InvalidParameters from "../errors/InvalidParameters";

export default class Value{
    private value!:number;

    constructor(value:number){
        if(!(typeof value === "number"))throw new InvalidParameters('Value must be a number');
        this.value = value;
    }

    public getValue(): number{
        return this.value;
    }
};
