import MissingRequiredParameters from "../../../shared/core/errors/MissingRequiredParameters";
import ResourceNotFoud from "../../../shared/core/errors/ResourceNotFound";
import type User from "../../core/model/User";
import type iUserRepository from "../contracts/repository/iUserRepository.repository";
import type GetUserDto from "../dtos/in/GetUserDto";
import UserInfo from "../dtos/out/UserInfoDto";

export default class GetUser{
    constructor(private repo: iUserRepository){}

    public async execute(userInfo:GetUserDto):Promise<UserInfo>{
        if(!userInfo.email && !userInfo.id)throw new MissingRequiredParameters('Missing parameteres',userInfo);

        let user: User | undefined;
        if(userInfo.email)user = await this.repo.getByEmail(userInfo.email);
        else if(userInfo.id) user = await this.repo.getById(userInfo.id);
        if(!user)throw new ResourceNotFoud('User');
    
        const info: UserInfo = new UserInfo();
        info.emails = user.getAllEmails().map((email) => [email.getEmail(), email.isVerified()]);
        info.id = user.getId();
        if(user.getUrlProfile())info.urlImage = user.getUrlProfile() as string;
        info.username = user.getUserName();

        return info;
    }
};
