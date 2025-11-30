import type iUserRepository from "../../contracts/repository/iUserRepository";

export let userRespository: jest.Mocked<iUserRepository>;
beforeEach(() => {
    userRespository = {
        create: jest.fn().mockReturnValue(true),
        deleteById: jest.fn(),
        getByEmail: jest.fn(),
        getById: jest.fn(),
        update: jest.fn(),
        existsByEmail: jest.fn(),
        existsById: jest.fn()
    }
});
