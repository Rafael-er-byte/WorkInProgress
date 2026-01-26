import TaskBusinessRules from "../constants/TaskBuisnessRules";
import Contributor from "../../../shared/core/objects/Contributor";
import ConflictDuplicateResource from "../../../shared/core/errors/ConflictDuplicatedResource";
import ResourceNotFound from "../../../shared/core/errors/ResourceNotFound";
import type Collection from "../../../shared/core/objects/Collection";
import LimitExceeded from "../../../shared/core/errors/LimitExceeded";
import MemberMustBeActive from "../error/MemberMustBeActive";

export default class ContributorCollection implements Collection{
    private readonly limitOfcontributors = TaskBusinessRules.maxContributors();
    private readonly contributors:Contributor[] = [];

    constructor(contributors:Contributor[] = []){
        this.contributors = contributors;
    }

    public addItem(contributor: Contributor): ContributorCollection {
        if(this.contributors.length + 1 > this.limitOfcontributors)throw new LimitExceeded('contributors limit exceeded');
        if(!contributor.isActive())throw new MemberMustBeActive(contributor);
        const exists = this.contributors.find(c => c.getId() === contributor.getId());
        if(exists)throw new ConflictDuplicateResource('This contributor already exists in this task', contributor);
        return new ContributorCollection([...this.contributors, contributor]);        
    }

    public deleteItem(contributor:Contributor): ContributorCollection {
        const deletecontributor = this.contributors.find(c => c.getId() === contributor.getId());
        if(!deletecontributor)throw new ResourceNotFound('This contributor doesnt exist in this task');
        return new ContributorCollection(this.contributors.filter(c => c.getId() !== contributor.getId()));
    }

    public find(contributor: Contributor):boolean{
        const exists = this.contributors.find(obj => obj.getId() === contributor.getId());
        if(exists)return true;
        return false;
    }

    public size(): number{
        return this.contributors.length;
    }

    public primitiveCollection(): Contributor[] {
        return [...this.contributors];
    }
};
