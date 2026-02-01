import DomainEvent from "../../../shared/core/events/DomainEvent";
import type Contributor from "../../../shared/core/objects/Contributor";
import type DateTime from "../../../shared/core/objects/DateTime";
import type IdEntity from "../../../shared/core/objects/IdEntity";
import type CategoryColor from "../objects/CategoryColor";

export default class CategoryColorChanged extends DomainEvent{
    constructor(date:DateTime, modifier: Contributor, idProject:IdEntity ,idEntity: IdEntity, newColor: CategoryColor){
        super(date, modifier, idProject, idEntity, 'CATEGORY_COLOR_CHANGED', newColor);
    }
};
