import InvalidParameters from "../../../../shared/errors/core/InvalidParameters";
import Password from "../Objects/Password";

describe('Password object tests', () => {
    const password: Password = new Password();

    it('Should set and get a valid password', () => {
        password.setPassword('23Fjoi$fo');
        expect(password.getPassword()).toBe('23Fjoi$fo');
    });

    it('Should throw if the password dont match te requirements', () => {
        expect(password.setPassword('12345678')).toThrow(InvalidParameters); //Only numbers
        expect(password.setPassword('aaaaaaaa')).toThrow(InvalidParameters); //Only low case letters
        expect(password.setPassword('GGGGGGGG')).toThrow(InvalidParameters); //Only high level letters
        expect(password.setPassword('12@Rsf')).toThrow(InvalidParameters); //Not minimum size
        expect(password.setPassword('12345')).toThrow(InvalidParameters); //Not minimum size and only numbers
        expect(password.setPassword('12#?foi4o4n')).toThrow(InvalidParameters); //Without high level letters
        expect(password.setPassword('fjo@joSD_?fR')).toThrow(InvalidParameters); //Without numbers
        expect(password.setPassword('92@13SD_?R')).toThrow(InvalidParameters); //Without low level letters
        expect(password.setPassword('ge3B5Fe85')).toThrow(InvalidParameters); //Without symbols
        expect(password.setPassword('')).toThrow(InvalidParameters); //Empty
        expect(password.setPassword()).toThrow(InvalidParameters); //undefined
    });
});
