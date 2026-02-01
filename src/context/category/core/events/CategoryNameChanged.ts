import DomainEvent from "../../../shared/core/events/DomainEvent";
import type Contributor from "../../../shared/core/objects/Contributor";
import type DateTime from "../../../shared/core/objects/DateTime";
import type IdEntity from "../../../shared/core/objects/IdEntity";
import type CategoryName from "../objects/CategoryName";

export default class CategoryNameChanged extends DomainEvent{
    constructor(date:DateTime, modifier: Contributor, idProject:IdEntity ,idEntity: IdEntity, newName: CategoryName){
        super(date, modifier, idProject, idEntity, 'CATEGORY_NAME_CHANGED', newName);
    }
};
