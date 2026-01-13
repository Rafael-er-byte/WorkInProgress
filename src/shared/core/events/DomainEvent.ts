import type Contributor from "../objects/Contributor";
import type DateTime from "../objects/DateTime";

export default class DomainEvent{
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
