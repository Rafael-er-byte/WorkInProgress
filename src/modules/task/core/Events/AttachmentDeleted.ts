import type Url from "../../../user/core/objects/URL";
import type Contributor from "../../../../shared/core/objects/Contributor";
import TaskEvent from "./TaskEvent";
import DateTime from "../../../../shared/core/objects/DateTime";

export default class AttachmentDeleted extends TaskEvent{
    constructor(date:DateTime, modifier: Contributor, attachment: Url){
        super(date, modifier, 'ATTACHMENT_DELETD', attachment);
    }
};
