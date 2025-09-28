import type User from "../../core/model/User";
import type TokenDto from "../dtos/out/TokenDto";
import type TokenPayLoad from "../dtos/out/TokenPayLoad";

export default interface iToken{
    generate(user:User, type:string, key:string, ttl:number): Promise<TokenDto>;
    validate(token:string, key:string): Promise<boolean>;
    decode(token:string): Promise<TokenPayLoad>;
};