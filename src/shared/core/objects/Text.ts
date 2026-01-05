import InvalidParameters from "../errors/InvalidParameters";

export default class Text{
    private text!:string;

    constructor(text:string){
        if(!text || typeof text !== 'string' || text.trim().length === 0)throw new InvalidParameters('Must be text');
        this.text = text;
    }

    public getText():string{
        return this.text;
    }

    public size(): number{
        return this.text.length;
    }
};
