import type Contributor from "../../../../shared/core/objects/Contributor";
import type DateTime from "../../../../shared/core/objects/DateTime";
import TaskEvent from "./TaskEvent";

export default class BeginDateUpdated extends TaskEvent{
    constructor(date:DateTime, modifier: Contributor, newDate: DateTime){
        super(date, modifier, 'BEGIN_DATE_UPDATED', newDate);
    }
};
