import BadRequest from "../../../../shared/errors/BadRequest";
import type iHasher from "../interfaces/iHasher";
import type UserBuilder from "./UserBuilder";

export default class User{
    private id!:string;
    private userName!:string; 
    private email!:string;
    private password!:string;
    private createdAt!:string;
    private urlProfile?:string | undefined;
    private isVerified: boolean = false;
    private readonly emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    private hasher!:iHasher;

    constructor(builder:UserBuilder){
        if(!builder.email || !builder.password || !builder.id || !builder.hasher || !builder.createdAt)throw new BadRequest('Missing required parameters', builder);
        this.hasher = builder.hasher;
        if(!this.hasher.validate(builder.password))throw new BadRequest('Invalid password', builder.password);
        this.password = this.hasher.hash(builder.password);
        if(!this.emailRegex.test(builder.email))throw new BadRequest('Invalid email', builder.email);
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

    verifyEmail(verify:boolean): void{
        this.isVerified = verify || this.isVerified;
    }

    updatePassword(newPassword:string): void{
        if(!this.hasher.validate(newPassword))throw new BadRequest('Invalid password', newPassword);
        this.password = this.hasher.hash(newPassword);
    }

    setPassword(newPwd:string): void{
        if(!this.hasher.validate(newPwd))throw new BadRequest('Invalid password', newPwd);
        this.password = this.hasher.hash(newPwd);
    }

    setUserName(userName:string): void{
        if(!userName)throw new BadRequest('Invalid username', userName);
        this.userName = userName;
    }

    setEmail(email:string): void{
        if(!this.emailRegex.test(email))throw new BadRequest('Invalid email', email);
        this.email = email;
    }

    setUrlProfile(url:string): void{
        if(!url)throw new BadRequest('Invalid url', url);
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