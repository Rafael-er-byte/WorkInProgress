import type iHasher from "../interfaces/iHasher";
import UserBuilder from "../model/UserBuilder";
import User from "../model/User";
import InvalidParameters from "../../../../shared/errors/core/InvalidParameters";
import MissingRequiredParameters from "../../../../shared/errors/core/MissingRequiredParameters";
import FailedToBuild from "../../../../shared/errors/core/FailedToBuild";

describe('User entity testing', () => {
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

    it('Should create an instance of User', async () => {
        let userBuilder: UserBuilder = new UserBuilder(mockHasher, validUUID1)
            .setEmail('example@example.com')
            .setUserName('User1')
            .setCreatedAt(validISOString);
            userBuilder = await userBuilder.setPassword('123456789');
        
        const user: User = await userBuilder.build();
        expect(user).toBeInstanceOf(User);
    });

    it('Should throw an error if the password is invalid', async () => {
        const userBuilder: UserBuilder = new UserBuilder(mockHasher, validUUID1)
            .setEmail('example@example.com')
            .setUserName('User1')
            .setCreatedAt(validISOString);

        await expect(userBuilder.setPassword('123')).rejects.toThrow(InvalidParameters);
        await expect(userBuilder.setPassword('123')).rejects.toThrow('Invalid password');
    });

    it('Should throw an error if a required parameter is missing', async () => {
        const userBuilder1: UserBuilder = new UserBuilder(mockHasher, validUUID1)
            .setEmail('example@example.com')
            .setUserName('User1')
            .setCreatedAt(validISOString); // Missing password

        let userBuilder2: UserBuilder = new UserBuilder(mockHasher, validUUID1)
            .setUserName('User1')
            .setCreatedAt(validISOString); // Missing email
            userBuilder2 = await userBuilder2.setPassword('123456789');

        await expect(userBuilder1.build()).rejects.toThrow(FailedToBuild);
        await expect(userBuilder1.build()).rejects.toThrow('Failed to build user');

        await expect(userBuilder2.build()).rejects.toThrow(FailedToBuild);
        await expect(userBuilder2.build()).rejects.toThrow('Failed to build user');
    });

    it('Should throw an error if the email is invalid', async() => {
        let userBuilder: UserBuilder = new UserBuilder(mockHasher, validUUID1)
            .setUserName('User1')
            .setCreatedAt(validISOString)
            .setEmail('example.com'); // Invalid email
            userBuilder = await userBuilder.setPassword('123456789');

        await expect(userBuilder.build()).rejects.toThrow(FailedToBuild);
        await expect(userBuilder.build()).rejects.toThrow('Failed to build user');
    });

    it('Should authenticate only if the password matches', async () => {
        const userBuilder = new UserBuilder(mockHasher, validUUID1)
            .setEmail('example@example.com')
            .setUserName('User1')
            .setCreatedAt(validISOString);
        
        await userBuilder.setPassword('123456789');

        const user: User = await userBuilder.build();

        expect(await user.auth('123456789')).toBe(true);
        expect(await user.auth('wrongpassword')).toBe(false);
        expect(await user.auth('')).toBe(false);
    });


    it('Should allow changing the email verification state', async () => {
        let userBuilder: UserBuilder = new UserBuilder(mockHasher, validUUID1)
            .setEmail('example@example.com')
            .setUserName('User1')
            .setCreatedAt(validISOString);
            userBuilder = await userBuilder.setPassword('123456789');
            
        const user: User = await userBuilder.build();
        expect(user.emailIsVerified()).toBe(false);

        user.verifyEmail();
        expect(user.emailIsVerified()).toBe(true);

        user.verifyEmail();
        expect(user.emailIsVerified()).toBe(true);
    });
});
