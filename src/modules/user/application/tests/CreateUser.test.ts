import { userRespository } from "./mocks/UserRepository.mock";
import { createIdManagerMock } from "../../../../shared/mocks/IdManagerMock";
import { createDateManagerMock } from "../../../../shared/mocks/DateManagerMock";
import { hasherMock } from "./mocks/Hasher.mock";
import CreateUser from "../services/CreateUser.service";
import GenerateUserName from "../utils/GenerateUserName";
import UserDto from "../dtos/in/UserDto";
import Action from "../dtos/out/Action";
import User from "../../core/model/User";
import MissingRequiredParameters from "../../../../shared/core/errors/MissingRequiredParameters";

describe('Create user service tests', () => {
    let IdManager!: ReturnType<typeof createIdManagerMock>;
    let dateManager!: ReturnType<typeof createDateManagerMock>;
    let createUser!: CreateUser;

    beforeEach(() => {
        IdManager = createIdManagerMock(),
        dateManager = createDateManagerMock(),
        createUser = new CreateUser(userRespository, hasherMock, IdManager, dateManager, new GenerateUserName());
    });

    it('Should create an instance of user', async () => {
        let userDto: UserDto = new UserDto();
        userDto.email = [["email1@example.com", false], ["email2@example.com", false]];
        userDto.mainEmail = "email1@example.com";
        userDto.havePassword = true;
        userDto.password = "ValidPa$sword48";
        userDto.urlProfile = "http://example.com";

        const success = await createUser.execute(userDto);
        expect(userRespository.create).toHaveBeenCalledWith(expect.any(User));
        expect(success).toBeInstanceOf(Action);
    });
    
    it('Should throw if not contain required parameters', async () => {
        let userDto: UserDto = new UserDto();
        userDto.havePassword = true;
        userDto.password = "ValidPa$sword48";
        userDto.urlProfile = "http://example.com";

        await expect(() => createUser.execute(userDto)).rejects.toThrow(MissingRequiredParameters);
    });
});
