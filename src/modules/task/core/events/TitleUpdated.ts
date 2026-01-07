import type Contributor from "../../../../shared/core/objects/Contributor";
import type DateTime from "../../../../shared/core/objects/DateTime";
import type Text from "../../../../shared/core/objects/Text";
import TaskEvent from "./TaskEvent";

export default class TitleUpdated extends TaskEvent{
    constructor(date:DateTime, modifier: Contributor, newTitle:Text){
        super(date, modifier, 'TITLE_UPDATED', newTitle);
    }
};
