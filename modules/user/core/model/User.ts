import InvalidOperation from "../../../../shared/errors/core/InvalidOperation";
import InvalidParameters from "../../../../shared/errors/core/InvalidParameters";
import MissingRequiredParameters from "../../../../shared/errors/core/MissingRequiredParameters";
import Email from "../Objects/Email";
import type UserBuilder from "./UserBuilder";

export default class User{
    private id!:string;
    private havePassword:boolean = false;
    private userName!:string; 
    private emailPrimary!:Email;
    private emails: Map<string, Email> = new Map();
    private password?:string;
    private urlProfile?:string | undefined;
    private readonly createdAt!:string;
    private readonly passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;

    constructor(builder:UserBuilder){
        if(!builder.emails || !builder.id)throw new MissingRequiredParameters('Missing required parameters', builder);
        
        builder.emails.forEach(email => {
            this.emails.set(email.getEmail(), email);
        });

        if(builder.havePassword) this.password = builder.password;

        this.havePassword = builder.havePassword;
        this.emailPrimary = builder.emailPrimary;
        this.userName = builder.userName;
        this.urlProfile = builder.urlProfile;
        this.id = builder.id;
        this.createdAt = builder.createdAt;
    }

    verifyEmail(email:string): void{
        const emailToVerify: Email | undefined= this.emails.get(email);
        if(!emailToVerify) throw new InvalidOperation('Email doesnt exists', email);
        emailToVerify.verify()
        this.emails.set(email, emailToVerify);
    }

    havePassKey(): boolean{
        return this.havePassword;
    }

    setPassword(newPwd:string): void{
        if(!this.havePassword)throw new MissingRequiredParameters('password');
        if(newPwd.length < 8 || !this.passwordRegex.test(newPwd)) throw new InvalidParameters('Password', newPwd);
        this.password = newPwd;
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
        this.emails.delete(email);
    }

    getMainEmail(){
        return this.emailPrimary;
    }

    setUrlProfile(url:string): void{
        if(!url)throw new MissingRequiredParameters('url');
        this.urlProfile = url;
    }

    deleteUrlProfile():void{
        this.urlProfile = undefined;
    }

    getAllEmails(): string[]{
        let emailsList: string[] = [];

        for(let [id, email] of this.emails) emailsList.push(email.getEmail());
        return emailsList;
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

    getId(): string{
        return this.id;
    }

    getPasssword(): string{
        if(!this.havePassword) throw new InvalidOperation('This user dont have password, try another method');
        return this.password!;
    }
};
