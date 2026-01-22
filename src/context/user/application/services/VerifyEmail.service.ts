import InvalidOperation from "../../../shared/core/errors/InvalidOperation";
import MissingRequiredParameters from "../../../shared/core/errors/MissingRequiredParameters";
import type User from "../../core/model/User";
import type iUserRepository from "../contracts/repository/iUserRepository.repository";
import type EmailDto from "../dtos/in/EmailDto";
import Action from "../dtos/out/Action";

export default class VerifyEmail{
    constructor(
        private repo: iUserRepository
    ){}

    public async execute(info:EmailDto):Promise<Action>{
        if(!info.email || !info.idUser)throw new MissingRequiredParameters('The email and id of the user are required', info);

        const user: User | undefined = await this.repo.getById(info.idUser);
        if(!user)throw new InvalidOperation('Imposible to validate the email', info);
        if(!user.hasEmail(info.email))throw new InvalidOperation('Imposible to validate the email', info);
    
        user.verifyEmail(info.email);

        const action:Action = new Action(true, 'Email verified successfuly', info.idUser);
        return action;
    }
};
