import type Contributor from "../../../../shared/core/objects/Contributor";
import TaskEvent from "./TaskEvent";

export default class TitleUpdated extends TaskEvent{
    constructor(modifier: Contributor, newTitle:string){
        super(modifier, 'TITLE_UPDATED', newTitle);
    }
};
