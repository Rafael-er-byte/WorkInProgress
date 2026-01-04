import InvalidParameters from "../../../../shared/core/errors/InvalidParameters";
import Contributor from "../../../../shared/core/objects/Contributor";
import type DateTime from "../../../../shared/core/objects/DateTime";
import ID from "../../../../shared/core/objects/ID";
import Text from "../../../../shared/core/objects/Text";

export default class Note{
    private readonly createdAt!:DateTime;
    private readonly id!: ID;
    private readonly creator!:Contributor;
    private readonly taskId!:ID;
    private lastUpdate!: DateTime;
    private content!: Text;

    constructor(
        createdAt:DateTime,
        id:ID,
        creator:Contributor,
        taskId:ID,
        lastUpdate:DateTime,
        content:Text
    ){
        this.createdAt = createdAt;
        this.id = id;
        this.creator = creator;
        this.taskId = taskId;
        this.lastUpdate = lastUpdate;
        this.content = content;
    }

    public setContent(newContent:Text, now:DateTime):void{
        if(!(newContent instanceof Text))throw new InvalidParameters('content cant be empty or different from text');
        this.content = newContent;
        this.lastUpdate = now;
    }

    public getID():ID{
        return this.id;
    }

    public getContent():Text{
        return this.content;
    }

    public getCreatedAtDate(): DateTime{
        return this.createdAt;
    }

    public getTaskID():ID{
        return this.taskId;
    }

    public getLastUpdate(): DateTime{
        return this.lastUpdate;
    }

    public getCreator(): Contributor{
        return this.creator;
    }
};
