import type IdProject from '../../../project/core/objects/IdProject';
import type None from '../../../shared/core/objects/None';
import type TaskCriteria from '../interface/TaskCriteria';
import type Task from '../model/Task';
import type TaskId from '../objects/TaskId';

export default interface iTaskRepository {
  create(task: Task): Promise<void>;
  update(task: Task): Promise<void>;
  updateMany(tasks: Task[]): Promise<void>;
  getById(from: IdProject, taskId: TaskId): Promise<Task | None>;
  getByCriteria(from: IdProject, criteria: TaskCriteria): Promise<Task[]>;
}
