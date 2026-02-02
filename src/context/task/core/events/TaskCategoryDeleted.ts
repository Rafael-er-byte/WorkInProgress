import type Member from "../../../member/core/model/Member";
import DomainEvent from "../../../shared/core/events/DomainEvent";
import type DateTime from "../../../shared/core/objects/DateTime";
import type IdEntity from "../../../shared/core/objects/IdEntity";
import type TaskCategory from "../objects/TaskCategory";

export default class TaskCategoryDeleted extends DomainEvent{
    constructor(date:DateTime, modifier: Member, idProject:IdEntity, idEntity: IdEntity, category: TaskCategory){
        super(date, modifier, idProject, idEntity, 'TASK_CATEGORY_DELETED', category);
    }
};
