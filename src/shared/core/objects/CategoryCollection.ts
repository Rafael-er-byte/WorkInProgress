import TaskBusinessRules from "../../../modules/task/core/constants/TaskBuisnessRules";
import type TaskCategory from "../../../modules/task/core/objects/TaskCategory";
import ConflictDuplicateResource from "../errors/ConflictDuplicatedResource";
import InvalidOperation from "../errors/InvalidOperation";
import ResourceNotFoud from "../errors/ResourceNotFound";
import type Collection from "./Collection";

export default class CategoryCollection implements Collection{
    private readonly limitOfCategories = TaskBusinessRules.maxCategories();
    private readonly categories:TaskCategory[] = [];

    constructor(categories:TaskCategory[] = []){
        this.categories = categories;
    }

    public addItem(category: TaskCategory): CategoryCollection {
        if(this.categories.length + 1 > this.limitOfCategories)throw new InvalidOperation('Categories limit exceeded');
        const exists = this.categories.find(c => c.getId() === category.getId());
        if(exists)throw new ConflictDuplicateResource('This category already exists in this task', category);
        return new CategoryCollection([...this.categories, category]);        
    }

    public deleteItem(category:TaskCategory): CategoryCollection {
        const deleteCategory = this.categories.find(c => c.getId() === category.getId());
        if(!deleteCategory)throw new ResourceNotFoud('This category doesnt exist in this task');
        return new CategoryCollection(this.categories.filter(c => c.getId() !== category.getId()));
    }
};
