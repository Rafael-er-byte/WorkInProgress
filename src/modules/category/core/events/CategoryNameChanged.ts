import type Member from '../../../member/core/model/Member';
import DomainEvent from '../../../shared/core/events/DomainEvent';
import type DateTime from '../../../shared/core/objects/DateTime';
import type IdEntity from '../../../shared/core/objects/IdEntity';
import type CategoryName from '../objects/CategoryName';

export default class CategoryNameChanged extends DomainEvent {
  constructor(
    date: DateTime,
    modifier: Member,
    idProject: IdEntity,
    idEntity: IdEntity,
    newName: CategoryName,
  ) {
    super(date, modifier, idProject, idEntity, 'CATEGORY_NAME_CHANGED', newName);
  }
}
