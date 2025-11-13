import InvalidParameters from "../../../shared/errors/InvalidParameters";
import MissingRequiredParameters from "../../../shared/errors/MissingRequiredParameters";

export default class Email{
    private email!:string;
    private verified:boolean = false;
    private readonly emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    constructor(){}

    setEmail(email:string): void{
        if(!email) throw new MissingRequiredParameters('email');
        if(!this.emailRegex.test(email)) throw new InvalidParameters('email');
        this.email = email;
        this.verified = false;
    }

    verify(): void{
        this.verified = true;
    }

    getEmail(): string{
        return this.email;
    }

    isVerified(): boolean{
        return this.verified;
    }
};
