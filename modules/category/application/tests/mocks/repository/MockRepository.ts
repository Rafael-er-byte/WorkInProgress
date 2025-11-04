import type iCategoryRepository from "../../../interfaces/repository/iRepository";

export let mockRepo: jest.Mocked<iCategoryRepository>;
beforeEach(() => {
    mockRepo = {
        create : jest.fn().mockReturnValue(true),
        update: jest.fn(),
        getAll: jest.fn(),
        getById: jest.fn(),
        delete: jest.fn()
    }
});
