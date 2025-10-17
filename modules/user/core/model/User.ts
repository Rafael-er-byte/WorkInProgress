import InvalidParameters from "../../../../shared/errors/core/InvalidParameters";
import MissingRequiredParameters from "../../../../shared/errors/core/MissingRequiredParameters";
import type iHasher from "../interfaces/iHasher";
import type UserBuilder from "./UserBuilder";

export default class User{
    private id!:string;
    private userName!:string; 
    private email!:string;
    private password!:string;
    private urlProfile?:string | undefined;
    private isVerified: boolean = false;
    private readonly createdAt!:string;
    private readonly emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    private readonly hasher!:iHasher;

    constructor(builder:UserBuilder){
        if(!builder.hasher || !builder.createdAt)throw new MissingRequiredParameters('Missing required parameters', builder);
        this.hasher = builder.hasher;
        this.createdAt = builder.createdAt;
    }

    async init(builder:UserBuilder){
        if(!builder.email || !builder.password || !builder.id)throw new MissingRequiredParameters('Missing required parameters', builder);
        if(!await this.hasher.validate(builder.password))throw new InvalidParameters('Invalid password', builder.password);
        this.password = await this.hasher.hash(builder.password);
        if(!this.emailRegex.test(builder.email))throw new InvalidParameters('Invalid email', builder.email);
        this.email = builder.email;
        this.userName = builder.userName;
        this.urlProfile = builder.urlProfile;
        this.isVerified = builder.isVerified;
        this.id = builder.id;
    }

    async auth(password: string): Promise<boolean>{
        return this.hasher.compare(password, this.password);
    }

    verifyEmail(): void{
        this.isVerified = true;
    }

    async updatePassword(newPassword:string): Promise<void>{
        if(!newPassword)throw new MissingRequiredParameters('password');
        if(!await this.hasher.validate(newPassword))throw new InvalidParameters('Invalid password', newPassword);
        this.password = this.hasher.hash(newPassword);
    }

    async setPassword(newPwd:string): Promise<void>{
        if(!newPwd)throw new MissingRequiredParameters('password');
        if(!await this.hasher.validate(newPwd))throw new InvalidParameters('Invalid password', newPwd);
        this.password = await this.hasher.hash(newPwd);
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
