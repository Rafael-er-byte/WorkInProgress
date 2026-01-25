import DomainEvent from "../../../shared/core/events/DomainEvent";
import type Contributor from "../../../shared/core/objects/Contributor";
import type DateTime from "../../../shared/core/objects/DateTime";
import type IdEntity from "../../../shared/core/objects/IdEntity";

export default class TaskContributorAdded extends DomainEvent{
    constructor(date:DateTime, modifier: Contributor, idEntity: IdEntity, contributor: Contributor){
        super(date, modifier, idEntity, 'TASK_CONTRIBUTOR_ADDED', contributor);
    }
};
