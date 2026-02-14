import type Member from '../../../member/core/model/Member';
import DomainEvent from '../../../shared/core/events/DomainEvent';
import type DateTime from '../../../shared/core/objects/DateTime';
import type IdEntity from '../../../shared/core/objects/IdEntity';
import type TaskId from '../objects/TaskId';

export default class TaskDeleted extends DomainEvent {
  constructor(date: DateTime, modifier: Member, idProject: IdEntity, taskId: TaskId) {
    super(date, modifier, idProject, taskId, 'TASK_DELETED', taskId);
  }
}
