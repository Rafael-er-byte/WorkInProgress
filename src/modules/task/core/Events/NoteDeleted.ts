import type Contributor from "../../../../shared/core/objects/Contributor";
import type TaskNote from "../objects/TaskNote";
import TaskEvent from "./TaskEvent";

export default class NoteDeleted extends TaskEvent{
    constructor(modifier: Contributor, note: TaskNote){
        super(modifier, 'NOTE_DELETED', note);
    }
};
