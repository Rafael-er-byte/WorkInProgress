import DomainEvent from "../../../../shared/core/events/DomainEvent";
import type Contributor from "../../../../shared/core/objects/Contributor";
import type DateTime from "../../../../shared/core/objects/DateTime";
import type TaskCategory from "../objects/TaskCategory";

export default class TaskCategoryDeleted extends DomainEvent{
    constructor(date:DateTime, modifier: Contributor, category: TaskCategory){
        super(date, modifier, 'TASK_CATEGORY_DELETED', category);
    }
};
