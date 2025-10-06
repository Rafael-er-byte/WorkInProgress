import BadRequest from "../../../../shared/errors/api/BadRequest";
import ConflictError from "../../../../shared/errors/api/ConflictError";
import type DateManager from "../../../../shared/interfaces/DateManager";
import type IDManager from "../../../../shared/interfaces/IDManager";
import type iHasher from "../../core/interfaces/iHasher";
import type User from "../../core/model/User";
import UserBuilder from "../../core/model/UserBuilder";
import type SaveUserDto from "../dtos/in/SaveUserDto";
import type LastId from "../interfaces/utils/iLastId";
import type iUserRepository from "../interfaces/repository/iUserRepository";
import Action from "../dtos/out/Action";

export default class SaveUserService{
    constructor(
        private repo:iUserRepository, 
        private idManager:IDManager, 
        private dateManager:DateManager, 
        private hasher:iHasher, 
        private lastIds:LastId,
        private keyIds:string
    ){}

    async execute(info:SaveUserDto): Promise<Action>{
        if(!info.email || !info.password)throw new BadRequest('Missing required parameters');

        if(await this.repo.existsByEmail(info.email))throw new ConflictError('User already exists');

        let userName:string;

        if(!info.userName){
            userName = this.keyIds + await this.lastIds.getLast(this.keyIds);
            await this.lastIds.increment(this.keyIds);
        }else userName = info.userName;

        const userBuilder: UserBuilder = new UserBuilder(this.hasher, this.idManager.generateId())
                                                        .setCreatedAt(this.dateManager.generate())
                                                        .setEmail(info.email)
                                                        .setPassword(info.password)
                                                        .setUserName(userName)
                                                        .setUrlProfile(info.urlProfile);

        const user:User = userBuilder.build();
        await this.repo.save(user);
        
        const action:Action = new Action(true, undefined, user.getId());
    
        return action;
    }
};
