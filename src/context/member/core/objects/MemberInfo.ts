import InvalidParameters from "../../../shared/core/errors/InvalidParameters";
import type Attachment from "../../../shared/core/objects/Attachment";
import Text from "../../../shared/core/objects/Text";
import ValueObject from "../../../shared/core/objects/ValueObject";
import MemberRules from "../constants/MemberRules";
import MemberProfileImageIsTooLarge from "../error/MemberProfileImageIsNotAValidImage";
import MemberUserNameIsTooLarge from "../error/MemberUserNameIsTooLarge";

export default class MemberInfo extends ValueObject{
    private username!:Text;
    private urlProfileImage!:Attachment; 
    private maxAtachmentMbSize = MemberRules.maxAttachmentMbSize();
    private attachmentType = MemberRules.attachmentType();
    private maxNameSize = MemberRules.maxNameSize();

    constructor(username:string, url:Attachment){
        super();
        if(username.length > this.maxNameSize)throw new MemberUserNameIsTooLarge(username);
        if(url.getSize().getValue() > this.maxAtachmentMbSize) throw new MemberProfileImageIsTooLarge(url);
        if(url.getType() !== this.attachmentType)throw new InvalidParameters("The attachment must be an image");

        this.username = new Text(username);
        this.urlProfileImage = url;
    }

    public getUserName(): string{
        return this.username.getText();
    }

    public getUrlProfileImage(): Attachment{
        return this.urlProfileImage;
    }
};
