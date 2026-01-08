import TaskBusinessRules from "../../../modules/task/core/constants/TaskBuisnessRules";
import ConflictDuplicateResource from "../errors/ConflictDuplicatedResource";
import InvalidOperation from "../errors/InvalidOperation";
import ResourceNotFoud from "../errors/ResourceNotFound";
import type Collection from "./Collection";
import type Contributor from "./Contributor";

export default class ContributorCollection implements Collection{
    private readonly limitOfcontributors = TaskBusinessRules.maxContributors();
    private readonly contributors:Contributor[] = [];

    constructor(contributors:Contributor[] = []){
        this.contributors = contributors;
    }

    public addItem(contributor: Contributor): ContributorCollection {
        if(this.contributors.length + 1 > this.limitOfcontributors)throw new InvalidOperation('contributors limit exceeded');
        const exists = this.contributors.find(c => c.getId() === contributor.getId());
        if(exists)throw new ConflictDuplicateResource('This contributor already exists in this task', contributor);
        return new ContributorCollection([...this.contributors, contributor]);        
    }

    public deleteItem(contributor:Contributor): ContributorCollection {
        const deletecontributor = this.contributors.find(c => c.getId() === contributor.getId());
        if(!deletecontributor)throw new ResourceNotFoud('This contributor doesnt exist in this task');
        return new ContributorCollection(this.contributors.filter(c => c.getId() !== contributor.getId()));
    }
};
