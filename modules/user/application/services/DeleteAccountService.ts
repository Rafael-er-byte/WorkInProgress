import AppError from "../../../../shared/errors/api/AppError";
import Unauthorized from "../../../../shared/errors/api/Unauthorized";
import type User from "../../core/model/User";
import type DeleteAccountDto from "../dtos/in/DeleteAccountDto";
import type TokenPayLoad from "../dtos/out/TokenPayLoad";
import type iToken from "../interfaces/utils/iToken";
import type iTokenRepository from "../interfaces/cache/iTokenRepository";
import type iUserRepository from "../interfaces/repository/iUserRepository";
import Action from "../dtos/out/Action";

export default class DeleteAccountService{
    constructor(
        private repo:iUserRepository, 
        private tokenRepo:iTokenRepository,
        private tokenManager:iToken, 
    ){}

    async execute(credentials: DeleteAccountDto): Promise<Action>{
        const payload: TokenPayLoad = await this.tokenManager.decode(credentials.token);
        const user: User | undefined = await this.repo.getById(payload.id);

        if(!user || !user!.auth(credentials.password)) throw new Unauthorized('Invalid credentials');

        const [userDeleted, tokenDeleted] = await Promise.all([
            this.repo.deleteById(payload.id),
            this.tokenRepo.deleteByPattern(`refresh:${payload.id}`)
        ]);
        
        if(!userDeleted) throw new AppError();

        const action:Action = new Action(true, undefined, user.getId());

        return action;
    }
};
