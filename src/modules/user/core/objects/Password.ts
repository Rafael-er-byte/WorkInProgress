import InvalidParameters from "../../../../shared/errors/InvalidParameters";
import MissingRequiredParameters from "../../../../shared/errors/MissingRequiredParameters";

export default class Password{
    private password?: string;
    private readonly passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/;

    setPassword(pwd:string):void{
        if(!pwd) throw new MissingRequiredParameters('Password');
        if(pwd.length < 8 || !this.passwordRegex.test(pwd)) throw new InvalidParameters('Password', pwd);
        this.password = pwd;
    }

    getPassword(): string{
        return this.password!;
    }
};
