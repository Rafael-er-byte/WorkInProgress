import type Contributor from "../../../../shared/core/objects/Contributor";
import type TaskNote from "../objects/TaskNote";
import TaskEvent from "./TaskEvent";

export default class NoteUpdated extends TaskEvent{
    constructor(modifier: Contributor, note: TaskNote){
        super(modifier, 'NOTE_UPDATED', note);
    }
};
