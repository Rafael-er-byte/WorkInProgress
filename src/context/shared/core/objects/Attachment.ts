import InvalidParameters from "../errors/InvalidParameters";
import { ALLOWED_ATTACHMENTS, type AllowedAttachents } from "../types/AllowedAttachment.types";
import None from "./None";
import type Text from "./Text";
import type Url from "./URL";
import type IntNumber from "./IntNumber";
import ValueObject from "./ValueObject";

export default class Attachment extends ValueObject{
    private url!:Url;
    private type!:AllowedAttachents;
    private name:Text | None = new None();
    private size:IntNumber | None = new None();

    constructor(url:Url, type: AllowedAttachents, name: Text | None, size: IntNumber | None){
        super();
        this.url = url;
        if(!ALLOWED_ATTACHMENTS.includes(type))throw new InvalidParameters('Attachment not supported');
        this.type = type;
        this.name = name;
        this.size = size;
    }

    public getUrl():Url{
        return this.url;
    }

    public getType(): AllowedAttachents{
        return this.type;
    }

    public getName(): Text | None{
        return this.name;
    }

    public getSize(): IntNumber | None{
        return this.size;
    }
};
