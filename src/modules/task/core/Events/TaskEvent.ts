import type Contributor from "../objects/Contributor";

export default class TaskEvent{
    private modifier!:Contributor;
    private modificationDate!: string;
    private event!: string;
    private info? : unknown;

    constructor(modifier: Contributor, event: string, info?:unknown){
        this.modifier = modifier;
        this.event = event;
        this.modificationDate = new Date().toISOString();
        if(info) this.info = info;
    }

    public getModifier(): Contributor{
        return this.modifier;
    }

    public getDate(): string{
        return this.modificationDate;
    }

    public getEvent(): string{  
        return this.event;
    }

    public getInfo():unknown{
        return this.info;
    }
};
