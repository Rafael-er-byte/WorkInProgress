import type iHasher from "../interfaces/iHasher";
import UserBuilder from "../model/UserBuilder";
import BadRequest from "../../../shared/exceptions/BadRequest";

describe('UserBuilder - invalid emails', () => {
    const mockHasher: iHasher = {
        hash: jest.fn((pwd) => "hashed_" + pwd),
        validate: jest.fn((pwd) => pwd.length >= 8),
        compare: jest.fn((pwd, hashed) => {
            const unHashed = hashed.replace(/^hashed_/, "");
            return unHashed === pwd;
        })
    };

    const validUUID1: string = '3f2504e0-4f89-41d3-9a0c-0305e82c3301'; 
    const validISOString: string = '2025-09-16T14:30:00.000Z';

    const invalidEmails = [
        'example.com',        // no "@"
        'example@',           // no domain part
        '@example.com',       // no username part
        'exa mple@example.com', // spaces
        'test@@example.com',  // multiple "@"
        'test!@example.com'   // invalid character
    ];

    test.each(invalidEmails)('Should throw an error for invalid email: %s', (email) => {
        const userBuilder: UserBuilder = new UserBuilder(mockHasher, validUUID1)
            .setUserName('User1')
            .setPassword('123456789')
            .setCreatedAt(validISOString)
            .setEmail(email);

        expect(() => userBuilder.build()).toThrow(BadRequest);
        expect(() => userBuilder.build()).toThrow('Invalid email');
    });
});
