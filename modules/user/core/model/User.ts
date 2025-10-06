import InvalidParameters from "../../../../shared/errors/core/InvalidParameters";
import MissingRequiredParameters from "../../../../shared/errors/core/MissingRequiredParameters";
import type iHasher from "../interfaces/iHasher";
import type UserBuilder from "./UserBuilder";

export default class User{
    private id!:string;
    private userName:string; 
    private email!:string;
    private password!:string;
    private createdAt!:string;
    private urlProfile?:string | undefined;
    private isVerified: boolean = false;
    private readonly emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    private hasher!:iHasher;

    constructor(builder:UserBuilder){
        if(!builder.email || !builder.password || !builder.id || !builder.hasher || !builder.createdAt)throw new MissingRequiredParameters('Missing required parameters', builder);
        this.hasher = builder.hasher;
        if(!this.hasher.validate(builder.password))throw new InvalidParameters('Invalid password', builder.password);
        this.password = this.hasher.hash(builder.password);
        if(!this.emailRegex.test(builder.email))throw new InvalidParameters('Invalid email', builder.email);
        this.email = builder.email;
        this.createdAt = builder.createdAt;
        this.userName = builder.userName;
        this.urlProfile = builder.urlProfile;
        this.isVerified = builder.isVerified;
        this.id = builder.id;
    }

    auth(password: string): boolean{
        return this.hasher.compare(password, this.password);
    }

    verifyEmail(): void{
        this.isVerified = true;
    }

    updatePassword(newPassword:string): void{
        if(!newPassword)throw new MissingRequiredParameters('password');
        if(!this.hasher.validate(newPassword))throw new InvalidParameters('Invalid password', newPassword);
        this.password = this.hasher.hash(newPassword);
    }

    setPassword(newPwd:string): void{
        if(!newPwd)throw new MissingRequiredParameters('password');
        if(!this.hasher.validate(newPwd))throw new InvalidParameters('Invalid password', newPwd);
        this.password = this.hasher.hash(newPwd);
    }

    setUserName(userName:string): void{
        if(!userName)throw new MissingRequiredParameters('username');
        this.userName = userName;
    }

    setEmail(email:string): void{
        if(!email)throw new MissingRequiredParameters('email');
        if(!this.emailRegex.test(email))throw new InvalidParameters('Invalid email', email);
        this.email = email;
        this.isVerified = false;
    }

    setUrlProfile(url:string): void{
        if(!url)throw new MissingRequiredParameters('url');
        this.urlProfile = url;
    }

    deleteUrlProfile():void{
        this.urlProfile = undefined;
    }

    getEmail(): string{
        return this.email;
    }

    getUrlProfile():string | undefined{
        return this.urlProfile;
    }

    getUserName(): string{
        return this.userName; 
    }

    getCreatedAt(): string{
        return this.createdAt;
    }

    emailIsVerified(): boolean{
        return this.isVerified;
    }

    getId(): string{
        return this.id;
    }
};
