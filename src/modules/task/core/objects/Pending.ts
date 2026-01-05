import type Contributor from "../../../../shared/core/objects/Contributor";
import type DateTime from "../../../../shared/core/objects/DateTime";
import None from "../../../../shared/core/objects/None";

export default class Pending{
    private readonly contributor:Contributor;
    private readonly settedPendingAt:DateTime;

    constructor(contributor:Contributor, settedPendingAt:DateTime){
        this.contributor = contributor;
        this.settedPendingAt = settedPendingAt;
    }

    public getContributor():Contributor{
        return this.contributor!;
    }

    public getCompletedDate():DateTime | None{
        return this.settedPendingAt!;
    }
};
