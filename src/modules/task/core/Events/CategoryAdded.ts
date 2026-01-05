import type Contributor from "../../../../shared/core/objects/Contributor";
import type DateTime from "../../../../shared/core/objects/DateTime";
import type TaskCategory from "../objects/TaskCategory";
import TaskEvent from "./TaskEvent";

export default class CategoryAdded extends TaskEvent{
    constructor(date:DateTime, modifier: Contributor, category: TaskCategory){
        super(date, modifier, 'CATEGORY_ADDED', category);
    }
};
