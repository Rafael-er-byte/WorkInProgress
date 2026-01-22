import DomainEvent from "../../../shared/core/events/DomainEvent";
import type Contributor from "../../../shared/core/objects/Contributor";
import type DateTime from "../../../shared/core/objects/DateTime";

export default class TaskContributorDeleted extends DomainEvent{
    constructor(date:DateTime, modifier: Contributor, contributor: Contributor){
        super(date, modifier, 'TASK_CONTRIBUTOR_DELETED', contributor);
    }
};
