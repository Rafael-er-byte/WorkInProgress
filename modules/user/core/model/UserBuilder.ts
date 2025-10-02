import FailedToBuild from "../../../../shared/errors/core/FailedToBuild";
import InvalidParameters from "../../../../shared/errors/core/InvalidParameters";
import MissingRequiredParameters from "../../../../shared/errors/core/MissingRequiredParameters";
import type iHasher from "../interfaces/iHasher";
import User from "./User";;

export default class UserBuilder {
    userName!: string;
    email!: string;
    password!: string;
    urlProfile?: string;
    createdAt!: string;
    isVerified: boolean = false;
    id!: string;

    constructor(public hasher: iHasher, id: string) {
        if (!hasher || !id) throw new MissingRequiredParameters('Missing required parameters', { hasher, id });
        this.id = id;
    }

    setUserName(userName: string): this {
        if (!userName) throw new MissingRequiredParameters('username');
        this.userName = userName;
        return this;
    }

    setEmail(email: string): this {
        if (!email) throw new MissingRequiredParameters('email');
        this.email = email;
        return this;
    }

    setPassword(password: string): this {
        if(!password) throw new MissingRequiredParameters('password')
        if (!this.hasher.validate(password)) throw new InvalidParameters('Invalid password', password);
        this.password = password;
        return this;
    }

    setUrlProfile(url: string | undefined): this {
        if (!url) return this;
        this.urlProfile = url;
        return this;
    }

    setCreatedAt(date: string): this {
        if (!date) throw new MissingRequiredParameters('date');
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
            throw new FailedToBuild('Failed to build user', error);
        }
    }
};
