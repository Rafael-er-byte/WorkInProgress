import type Member from "../../../member/core/model/Member";
import DomainEvent from "../../../shared/core/events/DomainEvent";
import type DateTime from "../../../shared/core/objects/DateTime";
import type IdEntity from "../../../shared/core/objects/IdEntity";
import type CategoryColor from "../objects/CategoryColor";

export default class CategoryColorChanged extends DomainEvent{
    constructor(date:DateTime, modifier: Member, idProject:IdEntity ,idEntity: IdEntity, newColor: CategoryColor){
        super(date, modifier, idProject, idEntity, 'CATEGORY_COLOR_CHANGED', newColor);
    }
};
