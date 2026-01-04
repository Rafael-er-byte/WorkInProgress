import type Contributor from "../objects/Contributor";
import TaskEvent from "./TaskEvent";

export default class TitleUpdated extends TaskEvent{
    constructor(modifier: Contributor, newTitle:string){
        super(modifier, 'TITLE_UPDATED', newTitle);
    }
};
