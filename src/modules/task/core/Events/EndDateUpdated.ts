import type Contributor from "../../../../shared/core/objects/Contributor";
import type DateTime from "../../../../shared/core/objects/DateTime";
import TaskEvent from "./TaskEvent";

export default class EndDateUpdated extends TaskEvent{
    constructor(modifier: Contributor, date: DateTime){
        super(modifier, 'END_DATE_UPDATED', date);
    }
};
