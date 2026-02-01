import Text from "../../../shared/core/objects/Text";
import ValueObject from "../../../shared/core/objects/ValueObject";
import CategoryNameMustBeAValidText from "../error/CategoryNameMustBeAValidText";

export default class CategoryName extends ValueObject{
    private name!:Text;

    constructor(name:string){
        super();
        try{
            this.name = new Text(name);
        }catch(error){
            throw new CategoryNameMustBeAValidText(name);
        }
    }

    public getName(): string{
        return this.name!.getText();
    }
};
