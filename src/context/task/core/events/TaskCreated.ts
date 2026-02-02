import type Member from "../../../member/core/model/Member";
import DomainEvent from "../../../shared/core/events/DomainEvent";
import type DateTime from "../../../shared/core/objects/DateTime";
import type IdEntity from "../../../shared/core/objects/IdEntity";
import type TaskId from "../objects/TaskId";
import type iTaskParams from "../params/iTaskParams";

export default class TaskCreated extends DomainEvent{
    constructor(date:DateTime, modifier: Member, idProject: IdEntity, taskId: TaskId, taskParams: iTaskParams){
        super(date, modifier, idProject, taskId, 'TASK_BACKGROUND_IMAGE_DELETED', taskParams);
    }
};
