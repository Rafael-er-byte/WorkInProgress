import Unauthorized from "../../../shared/core/errors/api/Unauthorized";
import type User from "../../core/model/User";
import type UserCredentials from "../dtos/in/UserCredentials";
import type TokenDto from "../dtos/out/TokenDto";
import type iToken from "../interfaces/utils/iToken";
import type iTokenRepository from "../interfaces/cache/iTokenRepository";
import type iUserRepository from "../interfaces/repository/iUserRepository";
import type iEnviroment from "../../../contracts/config/iEnviroment";

export default class AuthService{
    constructor(
        private repo:iUserRepository, 
        private tokenManager:iToken, 
        private tokenRepo:iTokenRepository, 
        private env:iEnviroment
    ){}

    async execute(credentials:UserCredentials): Promise<TokenDto[]>{
        if(!await this.repo.existsByEmail(credentials.email))throw new Unauthorized('Invalid credentials');
    
        const user: User | undefined = await this.repo.getByEmail(credentials.email);

        if(!user || !await user.auth(credentials.password))throw new Unauthorized('Invalid credentials');

        const [accessToken, refreshToken] = await Promise.all([
            this.tokenManager.generate(user as User, this.env.token.access, this.env.token.secretAccess, this.env.token.ttlAccess),
            this.tokenManager.generate(user as User, this.env.token.refresh, this.env.token.secretRefresh, this.env.token.ttlRefresh)
        ]);

        if(user) await this.tokenRepo.set(`refresh:${user.getId()}:${refreshToken.token}`, refreshToken.token, this.env.token.ttlRefresh);
        
        return [accessToken, refreshToken];
    }
};
