import type UserIdDto from "../dtos/in/UserIdDtos";
import type iUserRepository from "../interfaces/repository/iUserRepository";

export default class GetUserProfile{
    constructor(
        private repo: iUserRepository
    ){}

    async execute(id: UserIdDto){
        
    }
};
