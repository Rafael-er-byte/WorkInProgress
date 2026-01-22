import InvalidParameters from "../../../shared/core/errors/InvalidParameters";
import Text from "../../../shared/core/objects/Text";
import ValueObject from "../../../shared/core/objects/ValueObject";

export default class NoteContent extends ValueObject{
    private content!: Text;
    private readonly LIMIT_CONTENT_SIZE: number = 223;
    
    constructor(content:Text){
        super();
        if(this.content.size() > this.LIMIT_CONTENT_SIZE)throw new InvalidParameters('Content too large', content);
    }

    public getContent():Text{
        return this.content;
    }
}