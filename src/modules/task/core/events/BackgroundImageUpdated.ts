import type Contributor from "../../../../shared/core/objects/Contributor";
import type DateTime from "../../../../shared/core/objects/DateTime";
import TaskEvent from "./TaskEvent";

export default class BackgroundImageUpdated extends TaskEvent{
    constructor(date:DateTime, modifier: Contributor){
        super(date, modifier, 'BACKGROUND_IMAGE_UPDATED');
    }
};
