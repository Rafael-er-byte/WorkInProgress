import type Contributor from "../../../../shared/core/objects/Contributor";
import type Schedule from "../../../../shared/core/objects/Schedule";
import TaskEvent from "./TaskEvent";

export default class EndDateUpdated extends TaskEvent{
    constructor(modifier: Contributor, date: Schedule){
        super(modifier, 'END_DATE_UPDATED', date);
    }
};
