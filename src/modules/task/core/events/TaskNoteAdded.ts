import type DateTime from "../../../shared/core/objects/DateTime";
import DomainEvent from "../../../shared/core/events/DomainEvent";
import type IdEntity from "../../../shared/core/objects/IdEntity";
import type Member from "../../../member/core/model/Member";
import type Note from "../objects/Note";

export default class TaskNoteAdded extends DomainEvent{
    constructor(date:DateTime, modifier: Member, idProject: IdEntity, idTask: IdEntity, note: Note){
        super(date, modifier, idProject, idTask, 'TASK_NOTE_ADDED', note);
    }
};
