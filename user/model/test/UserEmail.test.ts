import type iHasher from "../interfaces/iHasher";
import UserBuilder from "../types/UserBuilder";

describe('UserBuilder - invalid emails', () => {
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
    

    it('Should throw an error if the email has no "@"', () => {
        const userBuilder: UserBuilder = new UserBuilder(mockHasher, validUUID1)
        .setUserName('User1')
        .setPassword('123456789')
        .setCreatedAt(validISOString)
        .setEmail('example.com'); // inválido

        expect(() => userBuilder.build()).toThrow('Invalid email');
    });

    it('Should throw an error if the email has no domain part', () => {
        const userBuilder: UserBuilder = new UserBuilder(mockHasher, validUUID1)
        .setUserName('User1')
        .setPassword('123456789')
        .setCreatedAt(validISOString)
        .setEmail('example@'); // inválido

        expect(() => userBuilder.build()).toThrow('Invalid email');
    });

    it('Should throw an error if the email has no username part', () => {
        const userBuilder: UserBuilder = new UserBuilder(mockHasher, validUUID1)
        .setUserName('User1')
        .setPassword('123456789')
        .setCreatedAt(validISOString)
        .setEmail('@example.com'); // inválido

        expect(() => userBuilder.build()).toThrow('Invalid email');
    });

    it('Should throw an error if the email has spaces', () => {
        const userBuilder: UserBuilder = new UserBuilder(mockHasher, validUUID1)
        .setUserName('User1')
        .setPassword('123456789')
        .setCreatedAt(validISOString)
        .setEmail('exa mple@example.com'); // inválido

        expect(() => userBuilder.build()).toThrow('Invalid email');
    });

    it('Should throw an error if the email has multiple "@"', () => {
        const userBuilder: UserBuilder = new UserBuilder(mockHasher, validUUID1)
        .setUserName('User1')
        .setPassword('123456789')
        .setCreatedAt(validISOString)
        .setEmail('test@@example.com'); // inválido

        expect(() => userBuilder.build()).toThrow('Invalid email');
    });

    it('Should throw an error if the email has invalid characters', () => {
        const userBuilder: UserBuilder = new UserBuilder(mockHasher, validUUID1)
        .setUserName('User1')
        .setPassword('123456789')
        .setCreatedAt(validISOString)
        .setEmail('test!@example.com'); // inválido

        expect(() => userBuilder.build()).toThrow('Invalid email');
    });
});
