import type User from "../../../core/model/User";

export default interface iToken{
    generate(user: User): Promise<string>;
    validate(code:string): Promise<boolean>;
};
