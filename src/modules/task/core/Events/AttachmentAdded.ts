import type Contributor from "../../../../shared/core/objects/Contributor";
import TaskEvent from "./TaskEvent";
import type DateTime from "../../../../shared/core/objects/DateTime";
import type Attachment from "../../../../shared/core/objects/Attachment";

export default class AttachmentAdded extends TaskEvent{
    constructor(date:DateTime, modifier: Contributor, attachment: Attachment){
        super(date, modifier, 'ATTACHMENT_ADDED', attachment);
    }
};
