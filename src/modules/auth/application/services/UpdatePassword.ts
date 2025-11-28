import Unauthorized from "../../../../shared/errors/api/Unauthorized";
import type iEnviroment from "../../../contracts/config/iEnviroment";
import type User from "../../core/model/User";
import type PasswordDto from "../dtos/in/Password";
import type TokenDto from "../dtos/in/TokenDto";
import type TokenPayLoad from "../dtos/out/TokenPayLoad";
import type iUserRepository from "../interfaces/repository/iUserRepository";
import type iToken from "../interfaces/utils/iToken";

export default class UpdatePasswordService{
    constructor(
        private tokenManager:iToken,
        private env: iEnviroment,
        private repo: iUserRepository
    ){}

    async execute(token:TokenDto, newPassword:PasswordDto): Promise<void>{
        if(!await this.tokenManager.validate(token.token, this.env.token.permission)) throw new Unauthorized('Please authenticate before');

        const payload: TokenPayLoad = await this.tokenManager.decode(token.token);

        const user: User | undefined = await this.repo.getById(payload.id);

        if(!user)throw new Unauthorized('Please authenticate before');

        await user!.setPassword(newPassword.password);
    }
};
