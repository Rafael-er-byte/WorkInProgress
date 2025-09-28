import AppError from "../../../../shared/errors/AppError";
import Unauthorized from "../../../../shared/errors/Unauthorized";
import type User from "../../core/model/User";
import type DeleteAccountDto from "../dtos/in/DeleteAccountDto";
import type TokenPayLoad from "../dtos/out/TokenPayLoad";
import type iToken from "../interfaces/iToken";
import type iTokenRepository from "../interfaces/iTokenRepository";
import type iUserRepository from "../interfaces/iUserRepository";

export default class DeleteAccountService{
    constructor(
        private repo:iUserRepository, 
        private tokenRepo:iTokenRepository,
        private tokenManager:iToken 
    ){}

    async execute(credentials: DeleteAccountDto): Promise<boolean>{
        const payload: TokenPayLoad = await this.tokenManager.decode(credentials.token);
        const user: User | undefined = await this.repo.getById(payload.id);

        if(!user || !await user.auth(credentials.password))throw new Unauthorized('Invalid credentials');

        const [userDeleted, tokenDeleted] = await Promise.all([
            this.repo.deleteById(payload.id),
            this.tokenRepo.deleteByPattern(`refresh:${payload.id}`)
        ]);
        
        if(!userDeleted) throw new AppError();
        return true;
    }
};