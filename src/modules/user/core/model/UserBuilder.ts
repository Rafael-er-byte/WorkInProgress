import FailedToBuild from "../../../../shared/core/errors/FailedToBuild";
import MissingRequiredParameters from "../../../../shared/core/errors/MissingRequiredParameters";
import BUILD_KEY from "../../token/UserBuilderKey";
import Email from "../objects/Email";
import Password from "../objects/Password";
import Url from "../objects/URL";
import User from "./User";;

export default class UserBuilder {
    userName!: string;
    emails: Map<string, Email> = new Map();
    emailPrimary!:string;
    password?: Password;
    urlProfile?: Url;
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

    setLocalPassword(haveIt:boolean): this{
        this.havePassword = haveIt;
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

    setEmailPrimary(email:string): this{
        this.emailPrimary = email;
        return this;
    }

    setPassword(password: string): this {
        if(!password) throw new MissingRequiredParameters('password')
        const newPwd = new Password();
        newPwd.setPassword(password);
        this.password = newPwd;
        return this;
    }

    setUrlProfile(url: string): this {
        if (!url) return this;
        this.urlProfile = new Url();
        this.urlProfile.setUrl(url);
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
            const user:User = new User(this, BUILD_KEY);
            return user;
        } catch (error) {
            throw new FailedToBuild('Failed to build user', error);
        }
    }
};
