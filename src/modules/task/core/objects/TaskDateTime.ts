import InvalidParameters from "../../../../shared/core/errors/InvalidParameters";
import DateTime from "../../../../shared/core/objects/DateTime";

export default class TaskDateTime{
    private date!:DateTime;

    constructor(date:DateTime){
        if(!DateTime.isAfter(date, DateTime.now()))throw new InvalidParameters('The start date must be in future', date);
        this.date = date;
    }

    public getDate():DateTime{
        return this.date;
    }
};
