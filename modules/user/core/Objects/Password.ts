import InvalidParameters from "../../../../shared/errors/core/InvalidParameters";
import MissingRequiredParameters from "../../../../shared/errors/core/MissingRequiredParameters";

export default class Password{
    private password?: string;
    private readonly passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;

    setPassword(pwd:string):void{
        if(!pwd) throw new MissingRequiredParameters('Password');
        if(pwd.length < 8 || !this.passwordRegex.test(pwd)) throw new InvalidParameters('Password', pwd);
        this.password = pwd;
    }

    getPassword(): string{
        return this.password!;
    }
};
