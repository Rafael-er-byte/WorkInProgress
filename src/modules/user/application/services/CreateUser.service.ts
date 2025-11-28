import type UserCreatedDto from "../../../category/application/dtos/out/UserCreatedDto";
import type iUserRepository from "../contracts/repository/iUserRepository";
import type iHasher from "../contracts/utils/iHasher";
import type UserDto from "../dtos/in/UserDto";

export default class CreateUser{
    constructor(private repo: iUserRepository, private hasher:iHasher){}

    public async execute(user: UserDto): UserCreatedDto{

    }
};
