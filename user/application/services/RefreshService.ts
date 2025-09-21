import Unauthorized from "../../../shared/exceptions/Unauthorized";
import type User from "../../domain/model/User";
import type RefreshDto from "../dtos/in/RefreshDto";
import type TokenDto from "../dtos/out/TokenDto";
import type iToken from "../interfaces/iToken";
import type iTokenRepository from "../interfaces/iTokenRepository";
import type iUserRepository from "../interfaces/iUserRepository";

export default class RefreshService{
    constructor(private tokenManager:iToken, private tokenRepo:iTokenRepository, private repo:iUserRepository){}

    async execute(refresh:RefreshDto): Promise<TokenDto>{
        if(!refresh.token || !refresh.userId)throw new Unauthorized('Invalid credentials', refresh);

        const currentTTL: number = await this.tokenRepo.getTTL(`refresh:${refresh.userId}:${refresh.token}`);
        if(currentTTL <= 0)throw new Unauthorized('Session expired');

        const user:User | undefined = await this.repo.getById(refresh.userId);

        if(!user)throw new Unauthorized('Something went worng');

        const [_, newRefreshToken] = await Promise.all([
            this.tokenRepo.delete(`refresh:${refresh.userId}:${refresh.token}`), 
            this.tokenManager.generate(user, process.env.REFRESH as string, process.env.SECRET_REFRESH as string, Number(process.env.TTL_REFRESH))
        ]);

        await this.tokenRepo.set(`refresh:${refresh.userId}:${newRefreshToken.token}`, newRefreshToken.token, Number(currentTTL));
        return newRefreshToken;
    }
};