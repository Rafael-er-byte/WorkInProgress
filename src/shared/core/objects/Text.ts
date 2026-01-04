import InvalidParameters from "../errors/InvalidParameters";

export default class Text{
    private text!:string;

    constructor(text:string){
        if(!text || typeof text !== 'string' || text.trim().length === 0)throw new InvalidParameters('text cant be empty or different from text');
        this.text = text;
    }

    public getText():string{
        return this.text;
    }
};
