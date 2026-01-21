import type User from "../../../core/model/User";
import type iEmail from "./iEmail.mail";

export default interface iEmailConstructor{
    build(user:User): iEmail;
};
