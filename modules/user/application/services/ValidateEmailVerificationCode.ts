import BadRequest from "../../../../shared/errors/api/BadRequest";
import type User from "../../core/model/User";
import type VerificationCode from "../dtos/in/VerificationCode";
import Action from "../dtos/out/Action";
import type iCodeRepository from "../interfaces/cache/iCodeRepository";
import type iUserRepository from "../interfaces/repository/iUserRepository";

export default class ValidateEmailVerificationCode{
    constructor(
        private repo: iUserRepository,
        private codeRepo: iCodeRepository
    ){}

    async execute(code:VerificationCode): Promise<Action>{
        const userId: string | null = await this.codeRepo.get(`verify:${code.code}`);
        
        if(!userId)throw new BadRequest('Invalid code');
        const user: User | undefined = await this.repo.getById(userId);

        user!.verifyEmail();

        const success: boolean = await this.repo.update(user!);

        const action:Action = new Action()
        action.success = success;
        action.data = 'Email verified';

        return action;
    }
};
