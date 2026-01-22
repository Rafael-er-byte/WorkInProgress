import NotFound from "../../../shared/core/errors/api/NotFound";
import Unauthorized from "../../../shared/core/errors/api/Unauthorized";
import type iEnviroment from "../../../contracts/config/iEnviroment";
import type User from "../../core/model/User";
import type UserCredentials from "../dtos/in/UserCredentials";
import type TokenDto from "../dtos/out/TokenDto";
import type iUserRepository from "../interfaces/repository/iUserRepository";
import type iToken from "../interfaces/utils/iToken";

export default class AuthToUpdatePassword{
    constructor(
        private tokenManager: iToken,
        private env: iEnviroment,
        private repo: iUserRepository
    ){}

    async execute(credentials: UserCredentials): Promise<TokenDto>{
        const user: User | undefined = await this.repo.getById(credentials.id);

        if(!user)throw new NotFound('User', credentials);
        if(!await user.auth(credentials.password)) throw new Unauthorized('Invalid credentials');

        const token: TokenDto = await this.tokenManager.generate(user, this.env.token.permission, this.env.token.secretPermission, this.env.token.ttlPermission);
        return token;
    }
};
