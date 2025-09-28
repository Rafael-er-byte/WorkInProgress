import type Enviroment from "../../../../config/env/Enviroment";
import Unauthorized from "../../../../shared/errors/Unauthorized";
import type RefreshDto from "../dtos/in/RefreshDto";
import type TokenPayLoad from "../dtos/out/TokenPayLoad";
import type iToken from "../interfaces/iToken";
import type iTokenRepository from "../interfaces/iTokenRepository";
import type iUserRepository from "../interfaces/iUserRepository";

export default class LogOutService{
    constructor(
        private tokenRepo:iTokenRepository, 
        private repo:iUserRepository, 
        private tokenManager: iToken,
        private env: Enviroment
    ){}

    async execute(refresh:RefreshDto): Promise<boolean>{

        const payload:TokenPayLoad = await this.tokenManager.decode(refresh.token);

        if(!payload)throw new Unauthorized('Invalid token');

        const [isTokenValid, user] = await Promise.all([
            this.tokenManager.validate(refresh.token, this.env.token.refresh),
            this.repo.existsById(payload.id)
        ]);

        if(!user || !isTokenValid)throw new Unauthorized('Invalid token');

        return await this.tokenRepo.delete(`refresh:${payload.id}:${refresh.token}`);
    }
};