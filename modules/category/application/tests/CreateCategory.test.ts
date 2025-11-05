import SaveCategory from "../services/SaveCategory.service";
import { mockRepo } from "./mocks/repository/MockRepository";
import { createIdManagerMock } from "../../../../shared/mocks/IdManagerMock";
import { createDateManagerMock } from "../../../../shared/mocks/DateManagerMock";
import CategoryDto from "../dtos/in/CategryDto";
import Action from "../dtos/out/ActionDto";
import BadRequest from "../../../../shared/errors/api/BadRequest";
import ServiceUnavailable from "../../../../shared/errors/api/ServiceUnavailable";

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

        const result = await createCategory.execute(categoryDto);
        expect(result).toBeInstanceOf(Action);
        expect(mockRepo.create).toHaveBeenCalledWith({idCategory: 'mock123', idCreator: 'mock123', name: 'Category1', createdAt: 'validDate'});
    });

    it('Should throw an error if dont send the id of creator', async () => {
        const categoryDto: CategoryDto = new CategoryDto();
        categoryDto.name = 'Category1';
        //categoryDto.idCreator = 'mock123'; Without idCreator

       expect(createCategory.execute(categoryDto)).rejects.toThrow(BadRequest);
    });

    it('Should throw an error if repository is unavailable', async () => {
        const categoryDto: CategoryDto = new CategoryDto();
        categoryDto.name = 'Category1';
        categoryDto.idCreator = 'mock123';
        
        mockRepo.create.mockRejectedValueOnce(new ServiceUnavailable('Test error'));

       expect(createCategory.execute(categoryDto)).rejects.toThrow(ServiceUnavailable);
    });

});
