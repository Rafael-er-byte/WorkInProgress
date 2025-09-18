import type User from "../../model/types/User";
import type UserCredentials from "../dtos/in/UserCredentials";
import type TokenDto from "../dtos/out/TokenDto";
import type iToken from "../interfaces/iToken";
import type iTokenRepository from "../interfaces/iTokenRepository";
import type iUserRepository from "../interfaces/iUserRepository";

export default class AuthService{
    constructor(private repo:iUserRepository, private tokenManager:iToken, private tokenRepo:iTokenRepository){}

    async execute(credentials:UserCredentials): Promise<TokenDto[]>{
        if(!await this.repo.existsByEmail(credentials.email))throw new Error('Invalid credentials');
    
        const user: User | undefined = await this.repo.getByEmail(credentials.email);

        if(!user || !user.auth(credentials.password))throw new Error('Invalid credentials');

        const [accessToken, refreshToken] = await Promise.all([
            this.tokenManager.generate(user as User, process.env.ACCESS as string, process.env.SECRET_ACCESS as string, Number(process.env.TTL_ACCESS)),
            this.tokenManager.generate(user as User, process.env.REFRESH as string, process.env.SECRET_REFRESH as string, Number(process.env.TTL_REFRESH))
        ]);

        if(user) await this.tokenRepo.set(`refresh:${user.getId()}:${refreshToken.token}`, refreshToken.token, Number(process.env.TTL_REFRESH));
        
        return [accessToken, refreshToken];
    }
};