import Unauthorized from "../../../../shared/errors/Unauthorized";
import type User from "../../core/model/User";
import type RefreshDto from "../dtos/in/RefreshDto";
import type iTokenRepository from "../interfaces/iTokenRepository";
import type iUserRepository from "../interfaces/iUserRepository";

export default class RefreshService{
    constructor(
        private tokenRepo:iTokenRepository, 
        private repo:iUserRepository, 
    ){}

    async execute(refresh:RefreshDto): Promise<boolean>{
        if(!refresh.token || !refresh.userId)throw new Unauthorized('Invalid credentials', refresh);

        const user:User | undefined = await this.repo.getById(refresh.userId);

        if(!user)throw new Unauthorized('Invalid token');

        return await this.tokenRepo.delete(`refresh:${refresh.userId}:${refresh.token}`);
    }
};