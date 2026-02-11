import type Member from '../../../member/core/model/Member';
import DomainEvent from '../../../shared/core/events/DomainEvent';
import type DateTime from '../../../shared/core/objects/DateTime';
import type IdEntity from '../../../shared/core/objects/IdEntity';
import type TaskPosition from '../objects/TaskPosition';

export default class TaskMoved extends DomainEvent {
  constructor(
    date: DateTime,
    modifier: Member,
    idProject: IdEntity,
    idEntity: IdEntity,
    newPosition: TaskPosition,
  ) {
    super(date, modifier, idProject, idEntity, 'TASK_MOVED', newPosition);
  }
}
