import Contributor from "../../../../shared/core/objects/Contributor";
import type DateTime from "../../../../shared/core/objects/DateTime";

export default class Completed{
    private readonly contributor!:Contributor;
    private readonly completedAt!:DateTime;

    constructor(contributor:Contributor, completedAt:DateTime){
        this.contributor = contributor;
        this.completedAt = completedAt;
    }

    public getContributor():Contributor{
        return this.contributor;
    }

    public getCompletedDate():DateTime{
        return this.completedAt;
    }
};
