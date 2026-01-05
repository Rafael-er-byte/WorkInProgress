import type Contributor from "../../../../shared/core/objects/Contributor";
import type DateTime from "../../../../shared/core/objects/DateTime";
import type TaskNote from "../objects/TaskNote";
import TaskEvent from "./TaskEvent";

export default class NoteAdded extends TaskEvent{
    constructor(date:DateTime, modifier: Contributor, note: TaskNote){
        super(date, modifier, 'NOTE_ADDED', note);
    }
};
