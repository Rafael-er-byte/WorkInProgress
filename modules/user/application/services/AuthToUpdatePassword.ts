import BadRequest from "../../../../shared/errors/api/BadRequest";
import NotFound from "../../../../shared/errors/api/NotFound";
import Unauthorized from "../../../../shared/errors/api/Unauthorized";
import type iEnviroment from "../../../interfaces/config/iEnviroment";
import type PasswordDto from "../dtos/in/Password";
import type RefreshDto from "../dtos/in/RefreshDto";
import type TokenDto from "../dtos/out/TokenDto";
import type TokenPayLoad from "../dtos/out/TokenPayLoad";
import type iTokenRepository from "../interfaces/cache/iTokenRepository";
import type iUserRepository from "../interfaces/repository/iUserRepository";
import type iToken from "../interfaces/utils/iToken";

export default class AuthToUpdatePassword{
    constructor(
        private tokenManager: iToken,
        private tokenRepo: iTokenRepository,
        private env: iEnviroment,
        private repo: iUserRepository
    ){}

    async execute(password: PasswordDto, tokenDto: RefreshDto): Promise<TokenDto>{
        if(!password || ! tokenDto)throw new BadRequest('Missing parameters', {password, tokenDto});
        const payload: TokenPayLoad = await  this.tokenManager.decode(tokenDto.token);

        const [isTokenValid, refresh, user] = await Promise.all([
            this.tokenManager.validate(tokenDto.token, this.env.token.refresh),
            this.tokenRepo.get(`refresh:${payload.id}:${tokenDto.token}`),
            this.repo.getById(payload.id)
        ]);

        if(!user)throw new NotFound('User', payload);
        if(!isTokenValid || !refresh) throw new Unauthorized('Invalid token');
        
        if(!user.auth(password.password)) throw new Unauthorized('Invalid credentials');

        const token: TokenDto = await this.tokenManager.generate(user, this.env.token.permission, this.env.token.secretPermission, this.env.token.ttlPermission);

        return token;
    }
};
