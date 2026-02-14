import CoreError from '../../../shared/core/errors/CoreError';

export default class TaskNoteContentTooLarge extends CoreError {
  constructor(info?: unknown) {
    super('The start date is not valid', info);
    Object.setPrototypeOf(this, TaskNoteContentTooLarge.prototype);
  }
}
