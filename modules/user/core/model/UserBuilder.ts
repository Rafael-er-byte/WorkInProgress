import FailedToBuild from "../../../../shared/errors/core/FailedToBuild";
import MissingRequiredParameters from "../../../../shared/errors/core/MissingRequiredParameters";
import Email from "../Objects/Email";
import User from "./User";;

export default class UserBuilder {
    userName!: string;
    emails: Map<string, Email> = new Map();
    emailPrimary!:Email;
    password!: string;
    urlProfile?: string;
    createdAt!: string;
    isVerified: boolean = false;
    id!: string;
    havePassword:boolean = true;

    constructor() {}

    setId(id:string): this{
        if(!id) throw new MissingRequiredParameters('id');
        this.id = id;
        return this;
    }

    localPassword(doesIt:boolean): this{
        this.havePassword = doesIt;
        return this;
    }

    setUserName(userName: string): this {
        if (!userName) throw new MissingRequiredParameters('username');
        this.userName = userName;
        return this;
    }

    setEmail(email: string, isVerified: boolean): this {
        if (!email) throw new MissingRequiredParameters('email');
        const newEmail:Email = new Email();
        newEmail.setEmail(email);
        if(isVerified) newEmail.verify();
        this.emails.set(email, newEmail);
        return this;
    }

    setEmailPrimary(email:Email): this{
        this.emailPrimary = email;
        return this;
    }

    setPassword(password: string): this {
        if(!password) throw new MissingRequiredParameters('password')
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
            const user:User = new User(this);
            return user;
        } catch (error) {
            throw new FailedToBuild('Failed to build user', error);
        }
    }
};
