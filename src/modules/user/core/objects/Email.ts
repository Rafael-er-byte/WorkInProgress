import InvalidParameters from "../../../../shared/core/errors/InvalidParameters";
import MissingRequiredParameters from "../../../../shared/core/errors/MissingRequiredParameters";

export default class Email{
    private email!:string;
    private verified:boolean = false;
    private readonly emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    constructor(email:string, isVerified: boolean = false){
        if(!email) throw new MissingRequiredParameters('email');
        if(!this.emailRegex.test(email)) throw new InvalidParameters('email');
        this.email = email;
        this.verified = isVerified;
    }

    getEmail(): string{
        return this.email;
    }

    isVerified(): boolean{
        return this.verified;
    }
};
