import type iEmailValidator from "./ports/iEmailValidator";
import type iHasher from "./ports/iHasher";
import type UserBuilder from "./UserBuilder";

export default class User{
    private userName!:string; 
    private email!:string;
    private password!:string;
    private createdAt!:string;
    private urlProfile?:string | undefined;
    
    private hasher!:iHasher;
    private emailValidator!:iEmailValidator;

    constructor(builder:UserBuilder){
        if(!builder.email || !builder.password || !builder.userName || !builder.hasher || !builder.emailValidator || !builder.createdAt)throw new Error('Missing required parameters')
        this.hasher = builder.hasher;
        this.emailValidator = builder.emailValidator;
        if(!this.hasher.validate(builder.password))throw new Error('Invalid password');
        this.password = this.hasher.hash(builder.password);
        if(!this.emailValidator.validate(builder.email))throw new Error('Invalid email');
        this.email = builder.email;
        this.createdAt = builder.createdAt;
        this.userName = builder.userName;
        this.urlProfile = builder.urlProfile;
    }

    auth(password: string): boolean{
        return this.hasher.compare(password, this.password);
    }

    setPassword(currentPwd:string, newPwd:string): void{
        if(!this.hasher.validate(newPwd) || !this.hasher.compare(currentPwd, this.password))throw new Error('Invalid password');
        this.password = this.hasher.hash(newPwd);
    }

    setUserName(userName:string): void{
        if(!userName)throw new Error("Missing parameters");
        this.userName = userName;
    }

    setEmail(email:string): void{
        if(!this.emailValidator.validate(email))throw new Error('Invalid email');
        this.email = email;
    }

    setUrlProfile(url:string): void{
        if(!url)throw new Error('Invalid url');
        this.urlProfile = url;
    }

    deleteUrlProfile():void{
        this.urlProfile = undefined;
    }

    getEmail(): string{
        return this.email;
    }

    getUrlProfiel():string | undefined{
        return this.urlProfile;
    }

    getUserName(): string{
        return this.userName; 
    }

    getCreatedAt(): string{
        return this.createdAt;
    }
};