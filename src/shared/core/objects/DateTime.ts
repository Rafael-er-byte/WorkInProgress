import InvalidParameters from "../errors/InvalidParameters";
import ValidateDateStrIso from "../helpers/ValidateDate.helper";
import type Text from "./Text";
import type Value from "./Value";

export default class DateTime{
    private date!:Text;
    private value!:Value;

    constructor(date:Text, valueDate:Value){
        if(!ValidateDateStrIso(date)) throw new InvalidParameters('date', date);
        this.date = date;
        this.value = valueDate;
    }

    static isAfterNow(futureDate:DateTime, now:DateTime): boolean{
        if(futureDate.getValue() > now.getValue())return true;
        return false;
    }

    public getDate(): string{
        return this.date.getText();
    }

    public getValue():number{
        return this.value.getValue();
    }
};
