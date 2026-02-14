import CategoryStatus from "../../../../../src/modules/category/core/objects/CategoryStatus";
import { AllowedCategoryStatus } from "../../../../../src/modules/category/core/types/AllowedCategoryStatus";
import InvalidParameters from "../../../../../src/modules/shared/core/errors/InvalidParameters";

describe('CategoryStatus Value Object', () => {

  describe('factory methods', () => {

    it('should create an active status using static factory', () => {
      const status = CategoryStatus.active();

      expect(status).toBeInstanceOf(CategoryStatus);
      expect(status.getStatus()).toBe(AllowedCategoryStatus.active);
    });

    it('should create a deleted status using static factory', () => {
      const status = CategoryStatus.deleted();

      expect(status).toBeInstanceOf(CategoryStatus);
      expect(status.getStatus()).toBe(AllowedCategoryStatus.deleted);
    });

  });

  describe('create category status', () => {

    it('should create a CategoryStatus for any allowed value', () => {
      const values = Object.values(AllowedCategoryStatus);

      for (const value of values) {
        const status = CategoryStatus.create(value);
        expect(status.getStatus()).toBe(value);
      }
    });

    it('should throw InvalidParameters for unsupported status', () => {
      const invalid = 'INVALID_STATUS' as AllowedCategoryStatus;

      expect(() => CategoryStatus.create(invalid)).toThrow(InvalidParameters);
    });

  });

  describe('category exists', () => {

    it('should return true when status is active', () => {
      const status = CategoryStatus.active();

      expect(status.exists()).toBe(true);
    });

    it('should return false when status is deleted', () => {
      const status = CategoryStatus.deleted();

      expect(status.exists()).toBe(false);
    });

  });

  describe('getStatus()', () => {

    it('should return the current status value', () => {
      const status = CategoryStatus.active();

      expect(status.getStatus()).toBe(AllowedCategoryStatus.active);
    });

  });

});
