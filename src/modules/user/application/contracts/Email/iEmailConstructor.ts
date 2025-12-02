import type User from "../../../core/model/User";
import type iEmail from "./iEmail.mail";

export interface iEmailConstructor{
    build(user:User): iEmail;
};
