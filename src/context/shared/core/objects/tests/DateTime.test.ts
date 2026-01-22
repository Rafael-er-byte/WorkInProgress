import InvalidParameters from "../../errors/InvalidParameters";
import DateTime from "../DateTime";
import Text from "../Text";
import IntNumber from "../IntNumber";

describe('DateTime tests', () => {

    const buildNow = () => {
        const nowIso = new Date().toISOString();
        return new DateTime(
            new Text(nowIso),
            new Value(new Date(nowIso).getTime())
        );
    };

    it('Should create a valid instance of DateTime and be after now', () => {
        const iso = '2026-01-04T23:30:45Z';

        const future = new DateTime(
            new Text(iso),
            new Value(new Date(iso).getTime())
        );

        const now = buildNow();

        expect(future).toBeInstanceOf(DateTime);
        expect(DateTime.isAfterNow(future, now)).toBe(true);
    });

    it('Should create a valid instance with milliseconds and be after now', () => {
        const iso = '2026-01-04T18:30:45.123Z';

        const future = new DateTime(
            new Text(iso),
            new Value(new Date(iso).getTime())
        );

        const now = buildNow();

        expect(future).toBeInstanceOf(DateTime);
        expect(DateTime.isAfterNow(future, now)).toBe(true);
    });

    it('Should create a valid instance on leap year Feb 29 and be after now', () => {
        const iso = '2028-02-29T12:00:00Z';

        const future = new DateTime(
            new Text(iso),
            new Value(new Date(iso).getTime())
        );

        const now = buildNow();

        expect(future).toBeInstanceOf(DateTime);
        expect(DateTime.isAfterNow(future, now)).toBe(true);
    });

    it('Should return false when comparing a past date with now', () => {
        const pastIso = '2000-01-01T00:00:00Z';

        const past = new DateTime(
            new Text(pastIso),
            new Value(new Date(pastIso).getTime())
        );

        const now = buildNow();

        expect(DateTime.isAfterNow(past, now)).toBe(false);
    });

    it('Should return false when past date is only a few milliseconds before now', () => {
        const nowMillis = Date.now();
        const pastMillis = nowMillis - 1;

        const pastIso = new Date(pastMillis).toISOString();

        const past = new DateTime(
            new Text(pastIso),
            new Value(pastMillis)
        );

        const now = new DateTime(
            new Text(new Date(nowMillis).toISOString()),
            new Value(nowMillis)
        );

        expect(DateTime.isAfterNow(past, now)).toBe(false);
    });

    it('Should return false when dates are equal', () => {
        const nowMillis = Date.now();
        const iso = new Date(nowMillis).toISOString();

        const dateA = new DateTime(
            new Text(iso),
            new Value(nowMillis)
        );

        const dateB = new DateTime(
            new Text(iso),
            new Value(nowMillis)
        );

        expect(DateTime.isAfterNow(dateA, dateB)).toBe(false);
    });

    it("Should throw an error if the string is not a valid iso string", () => {
        expect(() =>
            new DateTime(
                new Text('hello iso'),
                new Value(0)
            )
        ).toThrow(InvalidParameters);
    });

    it('Should throw if string is empty', () => {
        expect(() =>
            new DateTime(
                new Text(''),
                new Value(0)
            )
        ).toThrow(InvalidParameters);
    });

    it('Should throw if string contains only spaces', () => {
        expect(() =>
            new DateTime(
                new Text('   '),
                new Value(0)
            )
        ).toThrow(InvalidParameters);
    });

    it('Should throw if date part is invalid', () => {
        const iso = '2026-13-02T18:30:45Z';

        expect(() =>
            new DateTime(
                new Text(iso),
                new Value(new Date(iso).getTime())
            )
        ).toThrow(InvalidParameters);
    });

    it('Should throw if Feb 29 is used in a non-leap year', () => {
        const iso = '2026-02-29T12:00:00Z';

        expect(() =>
            new DateTime(
                new Text(iso),
                new Value(new Date(iso).getTime())
            )
        ).toThrow(InvalidParameters);
    });
});
