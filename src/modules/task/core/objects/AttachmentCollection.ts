import ConflictDuplicateResource from "../../../../shared/core/errors/ConflictDuplicatedResource";
import InvalidOperation from "../../../../shared/core/errors/InvalidOperation";
import ResourceNotFound from "../../../../shared/core/errors/ResourceNotFound";
import type Attachment from "../../../../shared/core/objects/Attachment";
import type Collection from "../../../../shared/core/objects/Collection";
import IntNumber from "../../../../shared/core/objects/IntNumber";
import TaskBusinessRules from "../constants/TaskBuisnessRules";

export default class AttachmentCollection implements Collection{
    private readonly limitOfattachments:number = TaskBusinessRules.maxAttachments();
    private readonly attachments:Attachment[] = [];
    
    constructor(attachments:Attachment[] = []){
        this.attachments = attachments;
    }

    public addItem(attachment:Attachment):AttachmentCollection{
        if(this.attachments.length + 1 > this.limitOfattachments)throw new InvalidOperation('attachment limit exeeded')
        const exists = this.attachments.find(savedattachment => savedattachment.getUrl() === attachment.getUrl());
        if(exists)throw new ConflictDuplicateResource('This attachment already exists', attachment);
        return new AttachmentCollection([...this.attachments, attachment]);
    }

    public deleteItem(attachment:Attachment):AttachmentCollection{
        const deleteAttachment = this.attachments.find(a => a.getUrl() === attachment.getUrl());
        if(!deleteAttachment)throw new ResourceNotFound('This attachment doesnt exist in this task');
        return new AttachmentCollection(this.attachments.filter(attach => attach.getUrl() !== attachment.getUrl()));
    }

    public find(attach: Attachment): boolean {
        const exists = this.attachments.find(obj => obj.getUrl() === attach.getUrl());
        if(exists)return true;
        return false;
    }

    public size(): IntNumber {
        return new IntNumber(this.attachments.length);
    }
};
