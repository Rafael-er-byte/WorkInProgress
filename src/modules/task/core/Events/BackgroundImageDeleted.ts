import type Contributor from "../objects/Contributor";
import TaskEvent from "./TaskEvent";

export default class BackgroundImageDeleted extends TaskEvent{
    constructor(modifier: Contributor){
        super(modifier, 'BACKGROUND_IMAGE_DELETED');
    }
};
