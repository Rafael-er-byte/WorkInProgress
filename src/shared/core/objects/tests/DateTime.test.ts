import InvalidParameters from "../../../../shared/core/errors/InvalidParameters";
import DateTime from "../DateTime";
import Text from "../Text";
import Value from "../Value";

describe('DateTime tests', () => {

    const now = new Value(Date.now());

    it('Should create a valid instance of DateTime', () => {
        const iso = '2026-01-04T23:30:45Z';
        const dateTime = new DateTime(
            new Text(iso),
            new Value(new Date(iso).getTime()),
            now
        );

        expect(dateTime).toBeInstanceOf(DateTime);
    });

    it('Should create a valid instance with milliseconds', () => {
        const iso = '2026-01-04T18:30:45.123Z';
        const dateTime = new DateTime(
            new Text(iso),
            new Value(new Date(iso).getTime()),
            now
        );

        expect(dateTime).toBeInstanceOf(DateTime);
    });

    it('Should create a valid instance on leap year Feb 29', () => {
        const iso = '2028-02-29T12:00:00Z';
        const dateTime = new DateTime(
            new Text(iso),
            new Value(new Date(iso).getTime()),
            now
        );

        expect(dateTime).toBeInstanceOf(DateTime);
    });

    it('Should create a valid instance on leap year with milliseconds', () => {
        const iso = '2032-02-29T23:59:59.999Z';
        const dateTime = new DateTime(
            new Text(iso),
            new Value(new Date(iso).getTime()),
            now
        );

        expect(dateTime).toBeInstanceOf(DateTime);
    });

    it('Should create a valid instance on year divisible by 400 (leap year)', () => {
        const iso = '2400-02-29T08:15:30Z';
        const dateTime = new DateTime(
            new Text(iso),
            new Value(new Date(iso).getTime()),
            now
        );

        expect(dateTime).toBeInstanceOf(DateTime);
    });

    it("Should throw an error if the string is not a valid iso string", () => {
        expect(() =>
            new DateTime(
                new Text('hello iso'),
                new Value(0),
                now
            )
        ).toThrow(InvalidParameters);
    });

    it('Should throw if string is empty', () => {
        expect(() =>
            new DateTime(
                new Text(''),
                new Value(0),
                now
            )
        ).toThrow(InvalidParameters);
    });

    it('Should throw if string contains only spaces', () => {
        expect(() =>
            new DateTime(
                new Text('   '),
                new Value(0),
                now
            )
        ).toThrow(InvalidParameters);
    });

    it('Should throw if date part is invalid', () => {
        const iso = '2026-13-02T18:30:45Z';
        expect(() =>
            new DateTime(
                new Text(iso),
                new Value(new Date(iso).getTime()),
                now
            )
        ).toThrow(InvalidParameters);
    });

    it('Should throw if day is invalid', () => {
        const iso = '2026-01-32T18:30:45Z';
        expect(() =>
            new DateTime(
                new Text(iso),
                new Value(new Date(iso).getTime()),
                now
            )
        ).toThrow(InvalidParameters);
    });

    it('Should throw if hour is out of range', () => {
        const iso = '2026-01-02T25:30:45Z';
        expect(() =>
            new DateTime(
                new Text(iso),
                new Value(new Date(iso).getTime()),
                now
            )
        ).toThrow(InvalidParameters);
    });

    it('Should throw if minutes are out of range', () => {
        const iso = '2026-01-02T18:61:45Z';
        expect(() =>
            new DateTime(
                new Text(iso),
                new Value(new Date(iso).getTime()),
                now
            )
        ).toThrow(InvalidParameters);
    });

    it('Should throw if seconds are out of range', () => {
        const iso = '2026-01-02T18:30:61Z';
        expect(() =>
            new DateTime(
                new Text(iso),
                new Value(new Date(iso).getTime()),
                now
            )
        ).toThrow(InvalidParameters);
    });

    it('Should throw if timezone is missing', () => {
        const iso = '2026-01-02T18:30:45';
        expect(() =>
            new DateTime(
                new Text(iso),
                new Value(new Date(iso).getTime()),
                now
            )
        ).toThrow(InvalidParameters);
    });

    it('Should throw if format is not ISO-8601', () => {
        const iso = '2026/01/02 18:30:45Z';
        expect(() =>
            new DateTime(
                new Text(iso),
                new Value(new Date(iso).getTime()),
                now
            )
        ).toThrow(InvalidParameters);
    });

    it('Should throw if value is not a real date', () => {
        const iso = '2026-02-30T18:30:45Z';
        expect(() =>
            new DateTime(
                new Text(iso),
                new Value(new Date(iso).getTime()),
                now
            )
        ).toThrow(InvalidParameters);
    });

    it('Should throw if Feb 29 is used in a non-leap year', () => {
        const iso = '2026-02-29T12:00:00Z';
        expect(() =>
            new DateTime(
                new Text(iso),
                new Value(new Date(iso).getTime()),
                now
            )
        ).toThrow(InvalidParameters);
    });

    it('Should throw if Feb 29 is used in a century non-leap year', () => {
        const iso = '2100-02-29T12:00:00Z';
        expect(() =>
            new DateTime(
                new Text(iso),
                new Value(new Date(iso).getTime()),
                now
            )
        ).toThrow(InvalidParameters);
    });
});
