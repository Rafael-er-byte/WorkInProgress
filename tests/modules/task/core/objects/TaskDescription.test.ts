import InvalidParameters from "../../../../../src/modules/shared/core/errors/InvalidParameters";
import LimitExceeded from "../../../../../src/modules/shared/core/errors/LimitExceeded";
import TaskRules from "../../../../../src/modules/task/core/constants/TaskRules";
import TaskDescription from "../../../../../src/modules/task/core/objects/TaskDescription";

describe('TaskDescription Value Object', () => {
  it('should create a valid TaskDescription instance', () => {
    const description = new TaskDescription('This is a task description');
    expect(description).toBeInstanceOf(TaskDescription);
  });

  it('should return the description text', () => {
    const text = 'This is a task description';
    const description = new TaskDescription(text);

    expect(description.getDescription()).toBe(text);
  });

  it('should throw if description is empty or invalid', () => {
    expect(() => new TaskDescription('')).toThrow(InvalidParameters);
    expect(() => new TaskDescription(undefined as unknown as string)).toThrow(InvalidParameters);
  });

  it('should throw if description exceeds the limit', () => {
    const overLimit = 'a'.repeat(TaskRules.descriptionLimit() + 1);

    expect(() => new TaskDescription(overLimit)).toThrow(LimitExceeded);
  });
});
