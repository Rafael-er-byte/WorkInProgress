import InvalidParameters from "../../../../../src/context/shared/core/errors/InvalidParameters";
import DateTime from "../../../../../src/context/shared/core/objects/DateTime";

describe('DateTime ValueObject ', () => {

  describe('create()', () => {

    it('should create a DateTime from a valid ISO string (with Z)', () => {
      const iso = '2024-01-15T10:30:45Z';

      const dateTime = DateTime.create(iso);

      expect(dateTime).toBeInstanceOf(DateTime);
      expect(dateTime.getValue()).toBe(new Date(iso).getTime());
    });

    it('should throw InvalidParameters for invalid formats', () => {
      const invalidDates = [
        '2024-01-15',               
        '2024-01-15T10:30:45',      
        'not-a-date',
        '',
        '2024-01-15T10:-30:45Z',
        '2024-100-15T10:30:45Z'
      ];

      for (const date of invalidDates) {
        expect(() => DateTime.create(date)).toThrow(InvalidParameters);
      }
    });

    it('should reject clearly invalid numbers', () => {
      const invalidDates = [
        '2024-13-01T10:30:45Z',     // month > 12
        '2024-01-01T25:00:00Z',     // hour > 24
        '2024-01-01T10:61:00Z',     // minute > 60
      ];

      for (const date of invalidDates) {
        expect(() => DateTime.create(date)).toThrow(InvalidParameters);
      }
    });

  });

  describe('now()', () => {

    it('should create a DateTime close to current time', () => {
      const before = Date.now();

      const now = DateTime.now();

      const after = Date.now();

      expect(now.getValue()).toBeGreaterThanOrEqual(before);
      expect(now.getValue()).toBeLessThanOrEqual(after);
    });

  });

 
  describe('isAfter()', () => {

    it('should return true if first date is after second', () => {
      const now = DateTime.create('2024-01-01T00:00:00Z');
      const future = DateTime.create('2024-01-02T00:00:00Z');

      expect(DateTime.isAfter(future, now)).toBe(true);
    });

    it('should return false if first date is before second', () => {
      const now = DateTime.create('2024-01-02T00:00:00Z');
      const past = DateTime.create('2024-01-01T00:00:00Z');

      expect(DateTime.isAfter(past, now)).toBe(false);
    });

    it('should return false if dates are equal', () => {
      const d1 = DateTime.create('2024-01-01T00:00:00Z');
      const d2 = DateTime.create('2024-01-01T00:00:00Z');

      expect(DateTime.isAfter(d1, d2)).toBe(false);
    });

  });

  describe('getters()', () => {

    it('getDate should return a Date instance', () => {
      const dt = DateTime.create('2024-01-01T00:00:00Z');

      expect(dt.getDate()).toBeInstanceOf(Date);
    });

    it('getValue should return a timestamp number', () => {
      const dt = DateTime.create('2024-01-01T00:00:00Z');

      expect(typeof dt.getValue()).toBe('number');
    });

  });

});
