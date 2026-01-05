import type Contributor from "../../../../shared/core/objects/Contributor";
import type DateTime from "../../../../shared/core/objects/DateTime";
import TaskEvent from "./TaskEvent";

export default class DescriptionUpdated extends TaskEvent{
    constructor(date:DateTime, modifier: Contributor, newDescription: string){
        super(date, modifier, 'DESCRIPTION_UPDATED', newDescription);
    }
};
