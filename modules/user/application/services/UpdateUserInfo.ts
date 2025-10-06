import BadRequest from "../../../../shared/errors/api/BadRequest";
import NotFound from "../../../../shared/errors/api/NotFound";
import type User from "../../core/model/User";
import type UserInfo from "../dtos/in/UserInfo";
import Action from "../dtos/out/Action";
import type iUserRepository from "../interfaces/repository/iUserRepository";

export default class UpdateUserInfo{
    constructor(
        private repo: iUserRepository
    ){}

    async execute(userInfo:UserInfo): Promise<Action>{
        if(!userInfo.id)throw new BadRequest('Missing required parameters', userInfo);
        const user: User | undefined = await this.repo.getById(userInfo.id);
        if(!user) throw new NotFound('User not found');
    
        if(userInfo.email)user.setEmail(userInfo.email);
        if(userInfo.urlImage)user.setUrlProfile(userInfo.urlImage);
        if(userInfo.username)user.setUserName(userInfo.username);

        const success: boolean = await this.repo.update(user);
    
        const action: Action = new Action(success, 'User info updated');
        
        return action;
    }
};
