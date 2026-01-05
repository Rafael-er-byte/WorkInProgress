import type Url from "../../../user/core/objects/URL";
import type Contributor from "../../../../shared/core/objects/Contributor";
import TaskEvent from "./TaskEvent";
import type DateTime from "../../../../shared/core/objects/DateTime";

export default class AttachmentAdded extends TaskEvent{
    constructor(date:DateTime, modifier: Contributor, attachment: Url){
        super(date, modifier, 'ATTACHMENT_ADDED', attachment);
    }
};
