import MissingRequiredParameters from "../../../../shared/core/errors/MissingRequiredParameters";

export default class Contributor{
    private id!: string;
    private userName!: string;

    constructor(id:string, userName:string){
        if(!id || id.trim().length === 0)throw new MissingRequiredParameters('id');
        if(!userName || userName.trim().length === 0)throw new MissingRequiredParameters('userName');

        this.id = id;
        this.userName = userName;
    }

    public getId():string{
        return this.id;
    }

    public getUserName(): string{
        return this.userName;
    }
};
