import type Contributor from "../objects/Contributor";
import type TaskCategory from "../objects/TaskCategory";
import TaskEvent from "./TaskEvent";

export default class CategoryDeleted extends TaskEvent{
    constructor(modifier: Contributor, category: TaskCategory){
        super(modifier, 'CATEGORY_DELETED', category);
    }
};
