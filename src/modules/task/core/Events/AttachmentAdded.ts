import type Url from "../../../user/core/objects/URL";
import type Contributor from "../../../../shared/core/objects/Contributor";
import TaskEvent from "./TaskEvent";

export default class AttachmentAdded extends TaskEvent{
    constructor(modifier: Contributor, attachment: Url){
        super(modifier, 'ATTACHMENT_ADDED', attachment);
    }
};
