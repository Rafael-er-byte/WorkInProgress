import Unauthorized from "../../../../shared/errors/Unauthorized";
import type iEnviroment from "../../../interfaces/config/iEnviroment";
import type RefreshDto from "../dtos/in/RefreshDto";
import type TokenDto from "../dtos/out/TokenDto";
import type TokenPayLoad from "../dtos/out/TokenPayLoad";
import type iToken from "../interfaces/utils/iToken";
import type iTokenRepository from "../interfaces/cache/iTokenRepository";
import type iUserRepository from "../interfaces/repository/iUserRepository";

export default class RefreshService{
    constructor(
        private tokenManager:iToken, 
        private tokenRepo:iTokenRepository, 
        private repo:iUserRepository, 
        private env: iEnviroment
    ){}

    async execute(refresh:RefreshDto): Promise<TokenDto>{
        const payload:TokenPayLoad = await this.tokenManager.decode(refresh.token);
        if(!payload)throw new Unauthorized('Invalid token');

        const [isTokenValid, currentTTL, user] = await Promise.all([
            this.tokenManager.validate(refresh.token, this.env.token.refresh),
            this.tokenRepo.getTTL(`refresh:${payload.id}:${refresh.token}`),
            this.repo.getById(payload.id)
        ]);

        if(!isTokenValid)throw new Unauthorized('Invalid credentials', refresh);
        if(currentTTL <= 0)throw new Unauthorized('Session expired');
        if(!user)throw new Unauthorized('Something went worng');

        const [_, newRefreshToken] = await Promise.all([
            this.tokenRepo.delete(`refresh:${payload.id}:${refresh.token}`), 
            this.tokenManager.generate(user, this.env.token.refresh, this.env.token.secretRefresh, this.env.token.ttlRefresh)
        ]);

        await this.tokenRepo.set(`refresh:${payload.id}:${newRefreshToken.token}`, newRefreshToken.token, Number(currentTTL));
        return newRefreshToken;
    }
};
