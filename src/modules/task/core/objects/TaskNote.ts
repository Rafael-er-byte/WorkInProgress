import MissingRequiredParameters from "../../../../shared/core/errors/MissingRequiredParameters";

export default class TaskNote{
    private id!:string;
    private titile!:string;

    constructor(id: string, title: string){
        if(!id || !title) throw new MissingRequiredParameters('Parameters id and title are required');
        if(id.trim().length === 0 || title.trim().length === 0)throw new MissingRequiredParameters('Parameters id and title are required');

        this.id = id;
        this.titile = title;
    }

    public getId():string{
        return this.id;
    }

    public getTitle():string{
        return this.titile;
    }
};
