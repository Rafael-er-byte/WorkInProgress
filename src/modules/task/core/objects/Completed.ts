import Contributor from "../../../../shared/core/objects/Contributor";
import type DateTime from "../../../../shared/core/objects/DateTime";
import ValueObject from "../../../../shared/core/objects/ValueObject";

export default class Completed extends ValueObject{
    private readonly contributor!:Contributor;
    private readonly completedAt!:DateTime;

    constructor(contributor:Contributor, completedAt:DateTime){
        super();
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
