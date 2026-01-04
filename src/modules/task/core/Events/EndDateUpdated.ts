import type Contributor from "../objects/Contributor";
import type Schedule from "../objects/Schedule";
import TaskEvent from "./TaskEvent";

export default class EndDateUpdated extends TaskEvent{
    constructor(modifier: Contributor, date: Schedule){
        super(modifier, 'END_DATE_UPDATED', date);
    }
};
