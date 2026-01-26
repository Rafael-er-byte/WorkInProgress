import InvalidParameters from "../../../shared/core/errors/InvalidParameters";
import LimitExceeded from "../../../shared/core/errors/LimitExceeded";
import type Attachment from "../../../shared/core/objects/Attachment";
import TaskBusinessRules from "../constants/TaskBuisnessRules";

export default class BackGroundImage{
    private image!: Attachment;
    private limitImageSize:number = TaskBusinessRules.getMaxMBLimitAttachmentSize();
    
    constructor(attachment: Attachment){
        if(attachment.getType() !== 'image')throw new InvalidParameters('The resource must be an image');
        if(attachment.getSize().getValue() > this.limitImageSize)throw new LimitExceeded(`The image size must be less or iqual than ${this.limitImageSize}`);
        this.image = attachment;
    }

    public getImage(): Attachment{
        return this.image;
    }
};
