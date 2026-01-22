import type Contributor from "../objects/Contributor";
import type DateTime from "../objects/DateTime";
import ID from "../objects/ID";

export default class DomainEvent{
    private modifier!:Contributor;
    private eventDate!: DateTime;
    private event!: string;
    private id!: ID;
    private info? : unknown;

    constructor(eventDate:DateTime, modifier: Contributor, event: string, info?:unknown){
        this.modifier = modifier;
        this.event = event;
        this.eventDate = eventDate;
        if(info) this.info = info;
        this.id = ID.generateId();
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

    public getId(): ID{
        return this.id;
    }
};
