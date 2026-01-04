import type Contributor from "../../../../shared/core/objects/Contributor";
import type TaskCategory from "../objects/TaskCategory";
import TaskEvent from "./TaskEvent";

export default class CategoryAdded extends TaskEvent{
    constructor(modifier: Contributor, category: TaskCategory){
        super(modifier, 'CATEGORY_ADDED', category);
    }
};
