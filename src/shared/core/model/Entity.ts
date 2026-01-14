import type DomainEvent from "../events/DomainEvent";
import DateTime from "../objects/DateTime";

export default class Entity{
    private history:DomainEvent[] = [];
    private lastUpdate!:DateTime
    
    constructor(){}

    protected addEvent(event:DomainEvent): void{
        this.history.push(event);
        this.lastUpdate = DateTime.now();
    }

    public pullEvents(): DomainEvent[]{
        const events = this.history;
        this.history = [];
        return events;
    }

    public getLastUpdate(): DateTime{
        return this.lastUpdate;
    }
};
