import crypto from 'crypto';

export default class GenerateUserName{
    constructor(){}

    public generate(): string{
        const hash = crypto.randomBytes(3).toString();
        return `User${hash}`;
    }
};
