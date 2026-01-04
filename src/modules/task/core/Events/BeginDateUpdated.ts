import type Contributor from "../objects/Contributor";
import type Schedule from "../objects/Schedule";
import TaskEvent from "./TaskEvent";

export default class BeginDateUpdated extends TaskEvent{
    constructor(modifier: Contributor, date: Schedule){
        super(modifier, 'BEGIN_DATE_UPDATED', date);
    }
};
