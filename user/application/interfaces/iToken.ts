import type User from "../../model/types/User";
import type TokenDto from "../dtos/out/TokenDto";

export default interface iToken{
    generate(user:User, type:string, key:string, ttl:number): Promise<TokenDto>;
    validate(token:string, key:string): Promise<boolean>
};