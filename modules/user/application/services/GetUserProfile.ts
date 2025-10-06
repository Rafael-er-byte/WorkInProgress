import BadRequest from "../../../../shared/errors/BadRequest";
import NotFound from "../../../../shared/errors/NotFound";
import type User from "../../core/model/User";
import type UserIdDto from "../dtos/in/UserIdDtos";
import UserProfile from "../dtos/out/UserProfile";
import type iUserRepository from "../interfaces/repository/iUserRepository";

export default class GetUserProfile{
    constructor(
        private repo: iUserRepository
    ){}

    async execute(userId: UserIdDto): Promise<UserProfile>{
        if(!userId.id)throw new BadRequest('Missing required parameters', userId);
        const user: User | undefined = await this.repo.getById(userId.id);
        if(!user) throw new NotFound('user', userId);
    
        const profile:UserProfile = new UserProfile();

        profile.id = user.getId();
        profile.email = user.getEmail();
        profile.isVerified = user.emailIsVerified();
        profile.urlImage = user.getUrlProfile();
        profile.userName = user.getUserName();

        return profile;
    }
};
