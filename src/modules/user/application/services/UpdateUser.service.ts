import MissingRequiredParameters from "../../../../shared/core/errors/MissingRequiredParameters";
import ResourceNotFoud from "../../../../shared/core/errors/ResourceNotFound";
import type IDManager from "../../../contracts/utils/IDManager";
import type User from "../../core/model/User";
import type iUserRepository from "../contracts/repository/iUserRepository";
import type UpdateUserDto from "../dtos/in/UpdateUserDto";
import Action from "../dtos/out/Action";

export default class UpdateUser{
    constructor(
        private repo: iUserRepository,
        private idManager: IDManager
    ){}

    public async execute(info: UpdateUserDto): Promise<Action>{
        if(!this.idManager.validateId(info.id)) throw new MissingRequiredParameters('id');

        const user: User | undefined = await this.repo.getById(info.id);
        if(!user) throw new ResourceNotFoud('User', info);

        if(info.urlProfile)user.setUrlProfile(info.urlProfile);
        if(info.username)user.setUserName(info.username);
        if(info.email)user.setEmail(info.email);
        if(info.setMainEmail && info.email)user.setMainEmail(info.email);

        const success: boolean = await this.repo.update(user);
        const action:Action = new Action(success, 'User updated', info.id);
        return action;
    }
};
