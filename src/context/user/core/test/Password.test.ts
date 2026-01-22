import InvalidParameters from "../../../shared/core/errors/InvalidParameters";
import MissingRequiredParameters from "../../../shared/core/errors/MissingRequiredParameters";
import Password from "../objects/Password";

describe('Password object tests', () => {

    it('Should set and get a valid password', () => {
        const password: Password = new Password('23Fjoi$fo');
        expect(password.getPassword()).toBe('23Fjoi$fo');
    });

    it('Should throw if the password dont match te requirements', () => {
        expect(() => new Password('12345678')).toThrow(InvalidParameters); //Only numbers
        expect(() => new Password('aaaaaaaa')).toThrow(InvalidParameters); //Only low case letters
        expect(() => new Password('GGGGGGGG')).toThrow(InvalidParameters); //Only high level letters
        expect(() => new Password('12@Rsf')).toThrow(InvalidParameters); //Not minimum size
        expect(() => new Password('12345')).toThrow(InvalidParameters); //Not minimum size and only numbers
        expect(() => new Password('12#?foi4o4n')).toThrow(InvalidParameters); //Without high level letters
        expect(() => new Password('fjo@joSD_?fR')).toThrow(InvalidParameters); //Without numbers
        expect(() => new Password('92@13SD_?R')).toThrow(InvalidParameters); //Without low level letters
        expect(() => new Password('ge3B5Fe85')).toThrow(InvalidParameters); //Without symbols
        expect(() => new Password('')).toThrow(MissingRequiredParameters); //Empty
        expect(() => new Password()).toThrow(MissingRequiredParameters); //undefined
    });
});
