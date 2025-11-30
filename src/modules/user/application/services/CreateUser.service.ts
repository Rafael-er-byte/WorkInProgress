import MissingRequiredParameters from "../../../../shared/core/errors/MissingRequiredParameters";
import type DateManager from "../../../contracts/utils/DateManager";
import type IDManager from "../../../contracts/utils/IDManager";
import UserBuilder from "../../core/model/UserBuilder";
import Password from "../../core/objects/Password";
import type iUserRepository from "../contracts/repository/iUserRepository";
import type iHasher from "../contracts/utils/iHasher";
import type UserDto from "../dtos/in/UserDto";
import Action from "../dtos/out/Action";
import type GenerateUserName from "../utils/GenerateUserName";

export default class CreateUser{
    constructor(
        private repo: iUserRepository, 
        private hasher:iHasher, 
        private idManager: IDManager, 
        private dateManager: DateManager,
        private generateUsername: GenerateUserName
    ){}

    public async execute(user: UserDto): Promise<Action>{
        const id: string = this.idManager.generateId();

        let builder:UserBuilder = new UserBuilder()
                                .setId(id)
                                .setCreatedAt(this.dateManager.generate());
    
        if(user.havePassword && user.password?.trim().length !== 0){
            const hashedPwd = await this.hasher.hash(user.password!);
            builder = builder.setPassword(hashedPwd);
        }
        if(user.userName)builder = builder.setUserName(user.userName);
        else{
            builder = builder.setUserName(this.generateUsername.generate());
        }

        if(!user.email || !user.mainEmail) throw new MissingRequiredParameters('email, mainEmail');

        user.email.map(([email, isVerified]) => {
            builder = builder.setEmail(email, isVerified);
        });

        builder = builder.setEmailPrimary(user.mainEmail!);

        const success = await this.repo.create(builder.build());

        const action: Action = new Action(success, 'User created', id);
        return action;
    }           
};
