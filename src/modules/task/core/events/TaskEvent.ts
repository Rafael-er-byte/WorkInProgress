import type Contributor from "../../../../shared/core/objects/Contributor";
import type DateTime from "../../../../shared/core/objects/DateTime";

export default class TaskEvent{
    private modifier!:Contributor;
    private eventDate!: DateTime;
    private event!: string;
    private info? : unknown;

    constructor(eventDate:DateTime, modifier: Contributor, event: string, info?:unknown){
        this.modifier = modifier;
        this.event = event;
        this.eventDate = eventDate;
        if(info) this.info = info;
    }

    public getModifier(): Contributor{
        return this.modifier;
    }

    public getDate(): DateTime{
        return this.eventDate;
    }

    public getEvent(): string{  
        return this.event;
    }

    public getInfo():unknown{
        return this.info;
    }
};
