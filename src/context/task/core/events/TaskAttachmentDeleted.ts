import type Contributor from "../../../shared/core/objects/Contributor";
import DateTime from "../../../shared/core/objects/DateTime";
import type Attachment from "../../../shared/core/objects/Attachment";
import DomainEvent from "../../../shared/core/events/DomainEvent";

export default class TaskAttachmentDeleted extends DomainEvent{
    constructor(date:DateTime, modifier: Contributor, attachment: Attachment){
        super(date, modifier, 'TASK_ATTACHMENT_DELETED', attachment);
    }
};
