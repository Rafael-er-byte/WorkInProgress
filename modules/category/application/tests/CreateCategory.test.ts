import SaveCategory from "../services/SaveCategory.service";
import { mockRepo } from "./mocks/repository/MockRepository";
import { createIdManagerMock } from "../../../../shared/mocks/IdManagerMock";
import { createDateManagerMock } from "../../../../shared/mocks/DateManagerMock";
import CategoryDto from "../dtos/in/CategryDto";

describe('Create category service tests', () => {
    let idManagerMock:ReturnType<typeof createIdManagerMock>;
    let dateManagerMock: ReturnType<typeof createDateManagerMock>;
    let createCategory: SaveCategory;

    beforeEach(() => {
        idManagerMock = createIdManagerMock();
        dateManagerMock = createDateManagerMock();
        createCategory = new SaveCategory(mockRepo, idManagerMock , dateManagerMock);
    });

    it('Should create an instance of Category and return an action object', async () => {
        const categoryDto: CategoryDto = new CategoryDto();
        categoryDto.name = 'Category1';
        categoryDto.idCreator = 'mock123';

        await createCategory.execute(categoryDto);
        expect(mockRepo.create).toHaveBeenCalledWith({idCategory: 'mock123', idCreator: 'mock123', name: 'Category1', createdAt: 'validDate'});
    });

});
