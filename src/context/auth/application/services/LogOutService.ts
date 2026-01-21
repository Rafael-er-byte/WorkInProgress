import type Enviroment from "../../../../shared/config/env/Enviroment";
import Unauthorized from "../../../../shared/core/errors/api/Unauthorized";
import type TokenPayLoad from "../dtos/out/TokenPayLoad";
import type iToken from "../interfaces/utils/iToken";
import type iTokenRepository from "../interfaces/cache/iTokenRepository";
import type iUserRepository from "../interfaces/repository/iUserRepository";
import Action from "../dtos/out/Action";
import type TokenDto from "../dtos/in/TokenDto";

export default class LogOutService{
    constructor(
        private tokenRepo:iTokenRepository, 
        private repo:iUserRepository, 
        private tokenManager: iToken,
        private env: Enviroment
    ){}

    async execute(refresh:TokenDto): Promise<Action>{

        const payload:TokenPayLoad = await this.tokenManager.decode(refresh.token);

        if(!payload)throw new Unauthorized('Invalid token');

        const [isTokenValid, user] = await Promise.all([
            this.tokenManager.validate(refresh.token, this.env.token.refresh),
            this.repo.existsById(payload.id)
        ]);

        if(!user || !isTokenValid)throw new Unauthorized('Invalid token');

        await this.tokenRepo.delete(`refresh:${payload.id}:${refresh.token}`);

        const action:Action = new Action(true);

        return action;
    }
};
