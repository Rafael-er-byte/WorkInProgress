import type Contributor from "../../../../shared/core/objects/Contributor";
import TaskEvent from "./TaskEvent";

export default class DescriptionUpdated extends TaskEvent{
    constructor(modifier: Contributor, newDescription: string){
        super(modifier, 'DESCRIPTION_UPDATED', newDescription);
    }
};
