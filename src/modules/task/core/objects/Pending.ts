import type Contributor from "../../../../shared/core/objects/Contributor";
import type DateTime from "../../../../shared/core/objects/DateTime";
import None from "../../../../shared/core/objects/None";

export default class Pending{
    private readonly contributor?:Contributor;
    private readonly settedPendingAt?:DateTime;
    private isDefault: boolean = false;

    constructor(contributor?:Contributor, settedPendingAt?:DateTime){
        if(!contributor || !settedPendingAt){
            this.isDefault = true;
        }
        else{
            this.contributor = contributor;
            this.settedPendingAt = settedPendingAt;
        }
    }

    public getContributor():Contributor | None{
        if(this.isDefault)return new None();
        return this.contributor!;
    }

    public getCompletedDate():DateTime | None{
        if(this.isDefault)return new None();
        return this.settedPendingAt!;
    }
};
