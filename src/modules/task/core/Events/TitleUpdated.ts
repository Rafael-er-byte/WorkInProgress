import type Contributor from "../../../../shared/core/objects/Contributor";
import type DateTime from "../../../../shared/core/objects/DateTime";
import TaskEvent from "./TaskEvent";

export default class TitleUpdated extends TaskEvent{
    constructor(date:DateTime, modifier: Contributor, newTitle:string){
        super(date, modifier, 'TITLE_UPDATED', newTitle);
    }
};
