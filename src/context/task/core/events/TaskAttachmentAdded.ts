import type DateTime from "../../../shared/core/objects/DateTime";
import type Attachment from "../../../shared/core/objects/Attachment";
import DomainEvent from "../../../shared/core/events/DomainEvent";
import type IdEntity from "../../../shared/core/objects/IdEntity";
import type Member from "../../../member/core/model/Member";

export default class TaskAttachmentAdded extends DomainEvent{
    constructor(date:DateTime, modifier: Member, idProject: IdEntity, idEntity: IdEntity, attachment: Attachment){
        super(date, modifier, idProject, idEntity, 'TASK_ATTACHMENT_ADDED', attachment);
    }
};
