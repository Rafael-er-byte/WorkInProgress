import type iHasher from "../interfaces/iHasher";
import UserBuilder from "../types/UserBuilder";
import User from "../types/User";

describe('User entity testing', () => {
    const mockHasher:iHasher = {
        hash: jest.fn((pwd) => "hashed_" + pwd),
        validate: jest.fn((pwd) => pwd.length >= 8),
        compare: jest.fn((pwd, hashed) => {
            const unHashed = hashed.replace(/^hashed_/, "");
            return unHashed === pwd;
        })
    }

    const validUUID1: string = '3f2504e0-4f89-41d3-9a0c-0305e82c3301'; 
    const validISOString: string = '2025-09-16T14:30:00.000Z';

    it('Should create an instance of User', () => {
        const userBulder:UserBuilder = new UserBuilder(mockHasher, validUUID1)
                                    .setEmail('example@example.com')
                                    .setUserName('User1')
                                    .setPassword('123456789')
                                    .setCreatedAt(validISOString);

        const user:User = userBulder.build();
        expect(user).toBeInstanceOf(User);
    });

    it('Should throw an error if the password that we send at create a instance of user is invalid', () => {
        const userBulder:UserBuilder = new UserBuilder(mockHasher, validUUID1)
                                    .setEmail('example@example.com')
                                    .setUserName('User1')
                                    .setCreatedAt(validISOString);

        expect(() => userBulder.setPassword('123')).toThrow('Invalid password');
    });

    it('Should throw an error that says that are missing parameter required if we dont set a required parameter in the builder', () => {
        const userBulder:UserBuilder = new UserBuilder(mockHasher, validUUID1)
                                    .setEmail('example@example.com')
                                    .setUserName('User1')
                                    //.setPassword('123456789') Missing password
                                    .setCreatedAt(validISOString);

        const userBulder2:UserBuilder = new UserBuilder(mockHasher, validUUID1)
                                    //.setEmail('example@example.com') Missing required parameter
                                    .setUserName('User1')
                                    .setPassword('123456789') 
                                    .setCreatedAt(validISOString);                            

        expect(() => userBulder.build()).toThrow('Missing required parameters');
        expect(() => userBulder2.build()).toThrow('Missing required parameters');
    });

    it('Should thorw an error if the email is invalid', () => {
        const userBulder:UserBuilder = new UserBuilder(mockHasher, validUUID1)
                                    .setUserName('User1')
                                    .setPassword('123456789')
                                    .setCreatedAt(validISOString)
                                    .setEmail('example.com');

        expect(() => userBulder.build()).toThrow('Invalid email');
    });

    it('Should auth only if the current password match with the sended password', () => {
        const userBulder:UserBuilder = new UserBuilder(mockHasher, validUUID1)
                                    .setEmail('example@example.com')
                                    .setUserName('User1')
                                    .setPassword('123456789')
                                    .setCreatedAt(validISOString);

        const user:User = userBulder.build();
        expect(user.auth('123456789')).toBe(true);
        expect(user.auth('123456789G')).toBe(false);
        expect(user.auth('1234')).toBe(false);
        expect(user.auth('13456789')).toBe(false);
        expect(user.auth('')).toBe(false);
    });

    it('Should can change the state of the email verification to false or true', () => {
        const userBulder:UserBuilder = new UserBuilder(mockHasher, validUUID1)
                                    .setEmail('example@example.com')
                                    .setUserName('User1')
                                    .setPassword('123456789')
                                    .setCreatedAt(validISOString);

        const user:User = userBulder.build();
        expect(user.emailIsVerified()).toBe(false);
        user.verifyEmail(true);
        expect(user.emailIsVerified()).toBe(true);
        user.verifyEmail();
        expect(user.emailIsVerified()).toBe(true);
    });
});