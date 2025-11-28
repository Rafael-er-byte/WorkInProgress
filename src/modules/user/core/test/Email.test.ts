import InvalidParameters from "../../../../shared/core/errors/InvalidParameters";
import MissingRequiredParameters from "../../../../shared/core/errors/MissingRequiredParameters";
import Email from "../objects/Email";

describe('Email class tests', () => {
    const email:Email = new Email();

    it('Should throw if the email that sends is not a valid email', () => {
        expect( () => email.setEmail('emailexample.com')).toThrow(InvalidParameters);
        expect(() => email.setEmail('email@examplecom')).toThrow(InvalidParameters);
        expect(() => email.setEmail('@example.com')).toThrow(InvalidParameters);
        expect(() => email.setEmail('email@.com')).toThrow(InvalidParameters);
        expect(() => email.setEmail('')).toThrow(MissingRequiredParameters);
        expect(() => email.setEmail('aaaaaaaaa')).toThrow(InvalidParameters);
        expect(() => email.setEmail('iy3uhdsj3')).toThrow(InvalidParameters);
        expect(() => email.setEmail(undefined)).toThrow(MissingRequiredParameters);
    });

    it('Should save and return the email saved', () => {
        email.setEmail('email@example.com');
        expect(email.getEmail()).toBe('email@example.com');
    });

    it('Should verify an email', () => {
        email.setEmail('email@example.com');
        expect(email.isVerified()).toBe(false);
        email.verify();
        expect(email.isVerified()).toBe(true);
    });
});
