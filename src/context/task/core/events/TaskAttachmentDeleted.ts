import type Contributor from "../../../shared/core/objects/Contributor";
import DateTime from "../../../shared/core/objects/DateTime";
import type Attachment from "../../../shared/core/objects/Attachment";
import DomainEvent from "../../../shared/core/events/DomainEvent";
import type IdEntity from "../../../shared/core/objects/IdEntity";

export default class TaskAttachmentDeleted extends DomainEvent{
    constructor(date:DateTime, modifier: Contributor, idEntity: IdEntity, attachment: Attachment){
        super(date, modifier, idEntity, 'TASK_ATTACHMENT_DELETED', attachment);
    }
};
