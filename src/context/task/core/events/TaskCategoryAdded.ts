import DomainEvent from "../../../shared/core/events/DomainEvent";
import type Contributor from "../../../shared/core/objects/Contributor";
import type DateTime from "../../../shared/core/objects/DateTime";
import type IdEntity from "../../../shared/core/objects/IdEntity";
import type TaskCategory from "../objects/TaskCategory";

export default class TaskCategoryAdded extends DomainEvent{
    constructor(date:DateTime, modifier: Contributor, idEntity: IdEntity, category: TaskCategory){
        super(date, modifier, idEntity, 'TASK_CATEGORY_ADDED', category);
    }
};
