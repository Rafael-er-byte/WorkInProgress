import InvalidOperation from "../../../../shared/core/errors/InvalidOperation";
import MissingRequiredParameters from "../../../../shared/core/errors/MissingRequiredParameters";
import Email from "../objects/Email";
import Password from "../objects/Password";
import Url from "../objects/URL";
import type UserBuilder from "./UserBuilder";
import type BUILD_KEY from "../token/UserBuilderKey";

export default class User{
    private id!:string;
    private havePassword:boolean = false;
    private userName!:string; 
    private emailPrimary?:Email | undefined;
    private emails: Map<string, Email> = new Map();
    private password?: Password;
    private urlProfile: Url = new Url();
    private readonly createdAt!:string;
    
    private readonly key!: typeof BUILD_KEY

    constructor(builder:UserBuilder, key: typeof BUILD_KEY){
        if(!builder.emails || !builder.id || !builder.createdAt)throw new MissingRequiredParameters('Missing required parameters', builder);
        
        builder.emails.forEach(email => {
            this.emails.set(email.getEmail(), email);
        });

        if(builder.havePassword) this.password = builder.password!;

        this.havePassword = builder.havePassword;
        this.emailPrimary = this.emails.get(builder.emailPrimary);
        if(!this.emailPrimary) throw new InvalidOperation('The primary email doesnt exists', builder.emailPrimary);
        this.userName = builder.userName;
        if(builder.urlProfile) this.urlProfile = builder.urlProfile;
        this.id = builder.id;
        this.createdAt = builder.createdAt;
    }

    verifyEmail(email:string): void{
        const emailToVerify: Email | undefined = this.emails.get(email);
        if(!emailToVerify) throw new InvalidOperation('Email doesnt exists', email);
        emailToVerify.verify()
        this.emails.set(email, emailToVerify);
    }

    hasPassword(): boolean{
        return this.havePassword;
    }

    setPassword(newPwd:string): void{
        if(!newPwd)throw new MissingRequiredParameters('password');
        const pwd: Password = new Password();
        pwd.setPassword(newPwd);
        this.password = pwd;
        this.havePassword = true;
    }

    setUserName(userName:string): void{
        if(!userName)throw new MissingRequiredParameters('username');
        this.userName = userName;
    }

    setMainEmail(email:string): void{
        const newMainEmail:Email | undefined = this.emails.get(email);
        if(!newMainEmail) throw new InvalidOperation('Email doesnt exists', email);
        this.emailPrimary = newMainEmail;
    }

    setEmail(email:string): void{
        const newEmail:Email = new Email();
        newEmail.setEmail(email);
        this.emails.set(email, newEmail);

        if(!this.emailPrimary) this.emailPrimary = newEmail;
    }

    deleteEmail(email:string){
        if(!this.emails.has(email)) throw new InvalidOperation('The Email doesnt exist');
        if(this.emailPrimary && email === this.emailPrimary!.getEmail()) this.emailPrimary = undefined;
        this.emails.delete(email);
    }

    getMainEmail(){
        return this.emailPrimary;
    }

    setUrlProfile(url:string): void{
        this.urlProfile.setUrl(url);
    }

    deleteUrlProfile():void{
        this.urlProfile.clearUrl();
    }

    getAllEmails(): string[]{
        let emailsList: string[] = [];

        for(let [id, email] of this.emails) emailsList.push(email.getEmail());
        return emailsList;
    }

    getUrlProfile():string | undefined{
        return this.urlProfile.getUrl();
    }

    getUserName(): string{
        return this.userName; 
    }

    getCreatedAt(): string{
        return this.createdAt;
    }

    getId(): string{
        return this.id;
    }

    getPasssword(): string{
        if(!this.havePassword) throw new InvalidOperation('This user dont have password, try another method');
        return this.password!.getPassword();
    }
};
