import FailedToBuild from "../../../../shared/core/errors/FailedToBuild";
import MissingRequiredParameters from "../../../../shared/core/errors/MissingRequiredParameters";
import BUILD_KEY from "../token/UserBuilderKey";
import Email from "../objects/Email";
import User from "./User";;

export default class UserBuilder {
    userName!: string;
    emails: Map<string, Email> = new Map();
    emailPrimary!:string;
    password?: string;
    urlProfile?: string;
    createdAt!: string;
    isVerified: boolean = false;
    id!: string;
    havePassword:boolean = false;

    constructor() {}

    setId(id:string): this{
        if(!id) throw new MissingRequiredParameters('id');
        this.id = id;
        return this;
    }

    setUserName(userName: string): this {
        if (!userName) throw new MissingRequiredParameters('username');
        this.userName = userName;
        return this;
    }

    setEmail(email: string, isVerified: boolean): this {
        if (!email) throw new MissingRequiredParameters('email');
        this.emails.set(email, new Email(email, isVerified));
        return this;
    }

    setEmailPrimary(email:string): this{
        this.emailPrimary = email;
        return this;
    }

    setPassword(password: string): this {
        if(!password) throw new MissingRequiredParameters('password')
        this.password = password;
        this.havePassword = true;
        return this;
    }

    setUrlProfile(url: string): this {
        if (!url) return this;
        this.urlProfile = url;
        return this;
    }

    setCreatedAt(date: string): this {
        if (!date) throw new MissingRequiredParameters('date');
        this.createdAt = date;
        return this;
    }

    build(): User {
        try {
            const user:User = new User(this, BUILD_KEY);
            return user;
        } catch (error) {
            throw new FailedToBuild('Failed to build user', error);
        }
    }
};
