import InvalidOperation from "../../../../shared/core/errors/InvalidOperation";
import type Text from "../../../../shared/core/objects/Text";
import ValueObject from "../../../../shared/core/objects/ValueObject";
import TaskBusinessRules from "../constants/TaskBuisnessRules";

export default class TaskTitle extends ValueObject{
    private title!:Text;

    constructor(title:Text){
        super();
        if(title.size() > TaskBusinessRules.titleLimit())throw new InvalidOperation('Title size limit exceeded');
    }

    public getTitle():Text{
        return this.title;
    }
};
