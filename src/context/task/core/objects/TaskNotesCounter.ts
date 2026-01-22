import IntNumber from "../../../shared/core/objects/IntNumber";
import ValueObject from "../../../shared/core/objects/ValueObject";

export default class TaskNoteCounter extends ValueObject{
    private quantity:number = 0;
    
    constructor(quantity: number){
        super();
        const intNum = new IntNumber(quantity);
        quantity = intNum.getValue();
    }

    public increment():TaskNoteCounter{
        return new TaskNoteCounter(this.quantity + 1);
    }

    public getNotesQuantity(): number{
        return this.quantity;
    }
};
