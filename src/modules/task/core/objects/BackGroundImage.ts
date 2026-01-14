import InvalidParameters from "../../../../shared/core/errors/InvalidParameters";
import type Attachment from "../../../../shared/core/objects/Attachment";

export default class BackGroundImage{
    private image!: Attachment;
    
    constructor(attachment: Attachment){
        if(attachment.getType() !== 'image')throw new InvalidParameters('The resource must be an image');
        this.image = attachment;
    }

    public getImage(): Attachment{
        return this.image;
    }
};
