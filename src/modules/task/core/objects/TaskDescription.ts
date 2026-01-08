import InvalidOperation from "../../../../shared/core/errors/InvalidOperation";
import type Text from "../../../../shared/core/objects/Text";
import ValueObject from "../../../../shared/core/objects/ValueObject";
import TaskBusinessRules from "../constants/TaskBuisnessRules";

export default class TaskDescription extends ValueObject{
    private description!:Text;

    constructor(description:Text){
        super();
        if(description.size() > TaskBusinessRules.descriptionLimit())throw new InvalidOperation('Description size limit exceeded');
        this.description = description;
    }

    public getDescription():Text{
        return this.description;
    }
};
