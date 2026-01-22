import InvalidParameters from "../../../shared/core/errors/InvalidParameters";
import MissingRequiredParameters from "../../../shared/core/errors/MissingRequiredParameters";
import Email from "../objects/Email";

describe('Email class tests', () => {

    it('Should throw if the email that sends is not a valid email', () => {
        expect( () => new Email('emailexample.com')).toThrow(InvalidParameters);
        expect(() => new Email('email@examplecom')).toThrow(InvalidParameters);
        expect(() => new Email('@example.com')).toThrow(InvalidParameters);
        expect(() => new Email('email@.com')).toThrow(InvalidParameters);
        expect(() => new Email('')).toThrow(MissingRequiredParameters);
        expect(() => new Email('aaaaaaaaa')).toThrow(InvalidParameters);
        expect(() => new Email('iy3uhdsj3')).toThrow(InvalidParameters);
        expect(() => new Email(undefined)).toThrow(MissingRequiredParameters);
    });

    it('Should save and return the email saved', () => {
        let email = new Email('email@example.com');
        expect(email.getEmail()).toBe('email@example.com');
    });

    it('Should verify an email', () => {
        let email = new Email('email@example.com');
        expect(email.isVerified()).toBe(false);
        email = new Email(email.getEmail(), true);
        expect(email.isVerified()).toBe(true);
    });
});
