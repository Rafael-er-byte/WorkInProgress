import InvalidParameters from "../../../shared/core/errors/InvalidParameters";
import DateTime from "../../../shared/core/objects/DateTime";
import ValueObject from "../../../shared/core/objects/ValueObject";
import MemberNoteInfo from "./MemberNoteInfo";
import Text from "../../../shared/core/objects/Text";

export default class Note extends ValueObject {
    private content!: Text;
    private creator!: MemberNoteInfo;
    private createdAt!: DateTime;

    constructor(content: string, creator: MemberNoteInfo, createdAt: Date) {
        super();

        this.content = new Text(content);

        if (!(creator instanceof MemberNoteInfo)) {
            throw new InvalidParameters("Member info is not valid", creator);
        }
        this.creator = creator;

        this.createdAt = DateTime.create(createdAt.toISOString());
    }

    public getContent(): string {
        return this.content.getText();
    }

    public getCreator(): MemberNoteInfo {
        return this.creator;
    }

    public getCreatedAt(): Date {
        return this.createdAt.getDate();
    }
}
