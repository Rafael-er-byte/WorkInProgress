import InvalidParameters from "../../../../../src/modules/shared/core/errors/InvalidParameters";
import DateTime from "../../../../../src/modules/shared/core/objects/DateTime";
import TaskDateTime from "../../../../../src/modules/task/core/objects/TaskDateTime";

describe('TaskDateTime Value Object', () => {
  it('should create a valid TaskDateTime instance with a future date', () => {
    const futureDate = new Date(Date.now() + 60_000);
    const dateTime = DateTime.create(futureDate.toISOString());

    const taskDateTime = new TaskDateTime(dateTime);

    expect(taskDateTime).toBeInstanceOf(TaskDateTime);
    expect(taskDateTime.getDate()).toBeInstanceOf(DateTime);
  });

  it('should throw if date is not in the future', () => {
    const now = DateTime.now();

    expect(() => new TaskDateTime(now)).toThrow(InvalidParameters);
  });

  it('should throw if date is in the past', () => {
    const pastDate = new Date(Date.now() - 60_000);
    const pastDateTime = DateTime.create(pastDate.toISOString());

    expect(() => new TaskDateTime(pastDateTime)).toThrow(InvalidParameters);
  });
});
