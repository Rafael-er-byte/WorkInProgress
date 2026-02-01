import DomainEvent from "../../../shared/core/events/DomainEvent";
import type Contributor from "../../../shared/core/objects/Contributor";
import type DateTime from "../../../shared/core/objects/DateTime";
import type IdEntity from "../../../shared/core/objects/IdEntity";

export default class CategoryCreated extends DomainEvent{
    constructor(date:DateTime, modifier: Contributor, idProject:IdEntity ,idEntity: IdEntity){
        super(date, modifier, idProject, idEntity, 'CATEGORY_CREATED');
    }
};
