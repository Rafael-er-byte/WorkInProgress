import InvalidParameters from "../../../shared/core/errors/InvalidParameters";
import LimitExceeded from "../../../shared/core/errors/LimitExceeded";
import type Attachment from "../../../shared/core/objects/Attachment";
import { AllowedAttachents } from "../../../shared/core/types/AllowedAttachment.types";
import TaskBusinessRules from "../constants/TaskRules";

export default class BackGroundImage{
    private image!: Attachment;
    private limitImageSize:number = TaskBusinessRules.getMaxMBLimitAttachmentSize();
    
    constructor(attachment: Attachment){
        if(attachment.getType() !== AllowedAttachents.image)throw new InvalidParameters('The resource must be an image');
        if(attachment.getSize().getValue() > this.limitImageSize)throw new LimitExceeded(`The image size must be less or iqual than ${this.limitImageSize}`);
        this.image = attachment;
    }

    public getImage(): Attachment{
        return this.image;
    }
};
