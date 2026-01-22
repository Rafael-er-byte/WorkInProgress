import MissingRequiredParameters from "../../../shared/core/errors/MissingRequiredParameters";
import ResourceNotFoud from "../../../shared/core/errors/ResourceNotFound";
import type User from "../../core/model/User";
import type iEmail from "../contracts/Email/iEmail.mail";
import type iEmailConstructor from "../contracts/Email/iEmailConstructor";
import type iEmailSender from "../contracts/Email/iEmailSender.sender";
import type iUserRepository from "../contracts/repository/iUserRepository.repository";
import type EmailDto from "../dtos/in/EmailDto";
import Action from "../dtos/out/Action";

export default class StartEmailVerification{

    constructor(
        private repo: iUserRepository,
        private sender: iEmailSender,
        private emailConstructor: iEmailConstructor
    ){}

    public async execute(info:EmailDto):Promise<Action>{
        if(!info.email || !info.idUser) throw new MissingRequiredParameters('email and id of user are required', info);
    
        const user: User | undefined = await this.repo.getById(info.idUser);
        if(!user)throw new ResourceNotFoud('User', info);

        if(!user.hasEmail(info.email))throw new ResourceNotFoud('User', info);

        const email: iEmail = this.emailConstructor.build(user);
        const success = await this.sender.send(email);
        const action:Action = new Action(success, 'Verification email sended');
        return action;
    }
};
