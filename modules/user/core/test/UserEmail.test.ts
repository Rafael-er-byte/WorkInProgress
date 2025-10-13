import type iHasher from "../interfaces/iHasher";
import UserBuilder from "../model/UserBuilder";
import FailedToBuild from "../../../../shared/errors/core/FailedToBuild";

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

    test.each(invalidEmails)('Should throw an error for invalid email: %s', async (email) => {
        let userBuilder: UserBuilder = new UserBuilder(mockHasher, validUUID1)
            .setUserName('User1')
            .setCreatedAt(validISOString)
            .setEmail(email);
            userBuilder = await userBuilder.setPassword('123456789');

        await expect(userBuilder.build()).rejects.toThrow(FailedToBuild);
        await expect(userBuilder.build()).rejects.toThrow('Failed to build user');
    });
});
