import InvalidParameters from "../../../../shared/core/errors/InvalidParameters";
import Schedule from "../Schedule";

//When going to execute this tests check if the dates of the tests are currently valid in UTC format to ensure that the tests work as expected

describe('Schedule tests', () => {
    let schedule: Schedule;

    it('Should create a valid instance of schedule', () => {
        schedule = new Schedule('2026-01-04T23:30:45Z');
        expect(schedule).toBeInstanceOf(Schedule);
    });

    it('Should create a valid instance with milliseconds', () => {
        schedule = new Schedule('2026-01-04T18:30:45.123Z');
        expect(schedule).toBeInstanceOf(Schedule);
    });

    it('Should create a valid instance on leap year Feb 29', () => {
        schedule = new Schedule('2028-02-29T12:00:00Z');
        expect(schedule).toBeInstanceOf(Schedule);
    });

    it('Should create a valid instance on leap year with milliseconds', () => {
        schedule = new Schedule('2032-02-29T23:59:59.999Z');
        expect(schedule).toBeInstanceOf(Schedule);
    });

    it('Should create a valid instance on year divisible by 400 (leap year)', () => {
        schedule = new Schedule('2400-02-29T08:15:30Z');
        expect(schedule).toBeInstanceOf(Schedule);
    });

    it("Should throw an error if the string is not a valid iso string", () => {
        expect(() => new Schedule('hello iso')).toThrow(InvalidParameters);
    });

    it('Should throw if string is empty', () => {
        expect(() => new Schedule('')).toThrow(InvalidParameters);
    });

    it('Should throw if string contains only spaces', () => {
        expect(() => new Schedule('   ')).toThrow(InvalidParameters);
    });

    it('Should throw if date part is invalid', () => {
        expect(() => new Schedule('2026-13-02T18:30:45Z')).toThrow(InvalidParameters);
    });

    it('Should throw if day is invalid', () => {
        expect(() => new Schedule('2026-01-32T18:30:45Z')).toThrow(InvalidParameters);
    });

    it('Should throw if hour is out of range', () => {
        expect(() => new Schedule('2026-01-02T25:30:45Z')).toThrow(InvalidParameters);
    });

    it('Should throw if minutes are out of range', () => {
        expect(() => new Schedule('2026-01-02T18:61:45Z')).toThrow(InvalidParameters);
    });

    it('Should throw if seconds are out of range', () => {
        expect(() => new Schedule('2026-01-02T18:30:61Z')).toThrow(InvalidParameters);
    });

    it('Should throw if timezone is missing', () => {
        expect(() => new Schedule('2026-01-02T18:30:45')).toThrow(InvalidParameters);
    });

    it('Should throw if format is not ISO-8601', () => {
        expect(() => new Schedule('2026/01/02 18:30:45Z')).toThrow(InvalidParameters);
    });

    it('Should throw if value is not a real date', () => {
        expect(() => new Schedule('2026-02-30T18:30:45Z')).toThrow(InvalidParameters);
    });

    it('Should throw if Feb 29 is used in a non-leap year', () => {
        expect(() => new Schedule('2026-02-29T12:00:00Z'))
            .toThrow(InvalidParameters);
    });

    it('Should throw if Feb 29 is used in a century non-leap year', () => {
        expect(() => new Schedule('1900-02-29T12:00:00Z'))
            .toThrow(InvalidParameters);
    });

    it('Should throw if Feb 29 is used in a non-leap year', () => {
        expect(() => new Schedule('2026-02-29T12:00:00Z'))
            .toThrow(InvalidParameters);
    });

    it('Should throw if Feb 29 is used in a century non-leap year', () => {
        expect(() => new Schedule('2100-02-29T12:00:00Z'))
            .toThrow(InvalidParameters);
    });
});
