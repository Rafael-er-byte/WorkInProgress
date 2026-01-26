import Contributor from "../../../shared/core/objects/Contributor";
import type DateTime from "../../../shared/core/objects/DateTime";
import ID from "../../../shared/core/objects/ID";
import Text from "../../../shared/core/objects/Text";
import type NoteContent from "../objects/NoteContent";
import type NoteId from "../objects/NoteId";

export default class Note {

    private readonly createdAt!:DateTime;
    private readonly id!: NoteId;
    private readonly creator!:Contributor;
    private readonly taskId!:ID;
    private content!: NoteContent;

    constructor(
        createdAt:DateTime,
        id:NoteId,
        creator:Contributor,
        taskId:ID,
        content:NoteContent
    ){
        this.createdAt = createdAt;
        this.id = id;
        this.creator = creator;
        this.taskId = taskId;
        this.content = content;
    }

    public getID():NoteId{
        return this.id;
    }

    public getContent():Text{
        return this.content.getContent();
    }

    public getCreatedAtDate(): DateTime{
        return this.createdAt;
    }

    public getTaskID():ID{
        return this.taskId;
    }

    public getCreator(): Contributor{
        return this.creator;
    }
};
