import LimitExceeded from "../../../shared/core/errors/LimitExceeded";
import Text from "../../../shared/core/objects/Text";
import ValueObject from "../../../shared/core/objects/ValueObject";
import TaskBusinessRules from "../constants/TaskRules";

export default class TaskDescription extends ValueObject{
    private description!:Text;

    constructor(description:string){
        super();
        const textDescription = new Text(description);
        if(textDescription.size() > TaskBusinessRules.descriptionLimit())throw new LimitExceeded('Description size limit exceeded');
        this.description = textDescription;
    }

    public getDescription():string{
        return this.description.getText();
    }
};
