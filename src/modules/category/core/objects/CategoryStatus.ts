import InvalidParameters from '../../../shared/core/errors/InvalidParameters';
import ValueObject from '../../../shared/core/objects/ValueObject';
import { ALLOWED_CATEGORY_STATUS, AllowedCategoryStatus } from '../types/AllowedCategoryStatus';

export default class CategoryStatus extends ValueObject {
  private status!: AllowedCategoryStatus;

  private constructor(status: AllowedCategoryStatus) {
    super();
    if (!ALLOWED_CATEGORY_STATUS.includes(status))
      throw new InvalidParameters('Category status not supported');
    this.status = status;
  }

  public static deleted(): CategoryStatus {
    return new CategoryStatus(AllowedCategoryStatus.deleted);
  }

  public static active(): CategoryStatus {
    return new CategoryStatus(AllowedCategoryStatus.active);
  }

  public static create(status: AllowedCategoryStatus): CategoryStatus {
    return new CategoryStatus(status);
  }

  public exists(): boolean {
    return this.status === AllowedCategoryStatus.active;
  }

  public getStatus(): AllowedCategoryStatus {
    return this.status;
  }
}
