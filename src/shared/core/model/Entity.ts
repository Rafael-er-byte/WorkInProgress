import type DomainEvent from "../events/DomainEvent";

export default class Entity{
    private history:DomainEvent[] = [];
    
    constructor(){}

    private addEvent(event:DomainEvent): void{
        this.history.push(event);
    }

    public pullEvents(): DomainEvent[]{
        const events = this.history;
        this.history = [];
        return events;
    }
};
