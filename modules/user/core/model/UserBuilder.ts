import type iHasher from "../interfaces/iHasher";
import User from "./User";
import BadRequest from "../../../../shared/errors/BadRequest";

export default class UserBuilder {
    userName!: string;
    email!: string;
    password!: string;
    urlProfile?: string;
    createdAt!: string;
    isVerified: boolean = false;
    id!: string;

    constructor(public hasher: iHasher, id: string) {
        if (!hasher || !id) throw new BadRequest('Missing required parameters', { hasher, id });
        this.id = id;
    }

    setUserName(userName: string): this {
        if (!userName) throw new BadRequest('Invalid username', userName);
        this.userName = userName;
        return this;
    }

    setEmail(email: string): this {
        if (!email) throw new BadRequest('Invalid email', email);
        this.email = email;
        return this;
    }

    setPassword(password: string): this {
        if (!this.hasher.validate(password)) throw new BadRequest('Invalid password', password);
        this.password = password;
        return this;
    }

    setUrlProfile(url: string | undefined): this {
        if (!url) return this;
        this.urlProfile = url;
        return this;
    }

    setCreatedAt(date: string): this {
        if (!date) throw new BadRequest('Invalid date', date);
        this.createdAt = date;
        return this;
    }

    setIsVerified(isVerified: boolean): this {
        if (isVerified) this.isVerified = isVerified;
        return this;
    }

    build(): User {
        try {
            return new User(this);
        } catch (error) {
            if (error instanceof BadRequest) throw error;
            throw new BadRequest('Failed to build user', error);
        }
    }
};
