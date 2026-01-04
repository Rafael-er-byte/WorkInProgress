import type Url from "../../../user/core/objects/URL";
import type Contributor from "../objects/Contributor";
import TaskEvent from "./TaskEvent";

export default class AttachmentDeleted extends TaskEvent{
    constructor(modifier: Contributor, attachment: Url){
        super(modifier, 'ATTACHMENT_DELETD', attachment);
    }
};
