import MissingRequiredParameters from "../../../shared/core/errors/MissingRequiredParameters";
import ResourceNotFoud from "../../../shared/core/errors/ResourceNotFound";
import type iUserRepository from "../contracts/repository/iUserRepository.repository";
import type UserIdDto from "../dtos/in/UserIdDto";
import Action from "../dtos/out/Action";

export default class DeleteUser{
    constructor(
        private repo: iUserRepository
    ){}

    public async execute(user:UserIdDto):Promise<Action>{
        if(!user.id)throw new MissingRequiredParameters('id');

        const exists: boolean = await this.repo.existsById(user.id);
        if(!exists)throw new ResourceNotFoud('User', user.id);
    
        const succes: boolean = await this.repo.deleteById(user.id);
        const action: Action = new Action(succes, 'User deleted', user.id);
        return action;
    }
};
