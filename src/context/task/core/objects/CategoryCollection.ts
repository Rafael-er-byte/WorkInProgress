import ConflictDuplicateResource from "../../../shared/core/errors/ConflictDuplicatedResource";
import LimitExceeded from "../../../shared/core/errors/LimitExceeded";
import ResourceNotFound from "../../../shared/core/errors/ResourceNotFound";
import type Collection from "../../../shared/core/objects/Collection";
import IntNumber from "../../../shared/core/objects/IntNumber";
import TaskBusinessRules from "../constants/TaskBuisnessRules";
import type TaskCategory from "./TaskCategory";

export default class CategoryCollection implements Collection{
    private readonly limitOfCategories = TaskBusinessRules.maxCategories();
    private readonly categories:TaskCategory[] = [];

    constructor(categories:TaskCategory[] = []){
        this.categories = categories;
    }

    public addItem(category: TaskCategory): CategoryCollection {
        if(this.categories.length + 1 > this.limitOfCategories)throw new LimitExceeded('Categories limit exceeded');
        const exists = this.categories.find(c => c.getId() === category.getId());
        if(exists)throw new ConflictDuplicateResource('This category already exists in this task', category);
        return new CategoryCollection([...this.categories, category]);        
    }

    public deleteItem(category:TaskCategory): CategoryCollection {
        const deleteCategory = this.categories.find(c => c.getId() === category.getId());
        if(!deleteCategory)throw new ResourceNotFound('This category doesnt exist in this task');
        return new CategoryCollection(this.categories.filter(c => c.getId() !== category.getId()));
    }

    public find(category: TaskCategory): boolean {
        const exists = this.categories.find(obj => obj.getId() === category.getId());
        if(exists)return true;
        return false;
    }

    public size(): number {
        return this.categories.length;
    }

    public primitiveCollection(): TaskCategory[] {
        return [...this.categories];
    }
};
