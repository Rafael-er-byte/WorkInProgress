import InvalidParameters from "../errors/InvalidParameters";

export default class ID{
    private id!:string;

    constructor(id:string){
        if(!id || id.trim().length === 0)throw new InvalidParameters('Invalid ID');
        this.id = id; 
    }

    public getId(): string{
        return this.id;
    }
};
