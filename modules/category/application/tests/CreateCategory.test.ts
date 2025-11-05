import SaveCategory from "../services/SaveCategory.service";
import { mockRepo } from "./mocks/repository/MockRepository";
import { createIdManagerMock } from "../../../../shared/mocks/IdManagerMock";
import { createDateManagerMock } from "../../../../shared/mocks/DateManagerMock";
import CategoryDto from "../dtos/in/CategryDto";
import Action from "../dtos/out/ActionDto";
import BadRequest from "../../../../shared/errors/api/BadRequest";
import InvalidParameters from "../../../../shared/errors/core/InvalidParameters";
import MissingRequiredParameters from "../../../../shared/errors/core/MissingRequiredParameters";

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
        categoryDto.icon = 'icon';

        const result = await createCategory.execute(categoryDto);
        expect(result).toBeInstanceOf(Action);
        expect(mockRepo.create).toHaveBeenCalledWith({idCategory: 'mock123', idCreator: 'mock123', name: 'Category1', createdAt: 'validDate', icon: 'icon'});
    });

    it('Should throw an error if dont send the id of creator', async () => {
        const categoryDto: CategoryDto = new CategoryDto();
        categoryDto.name = 'Category1';
        //categoryDto.idCreator = 'mock123'; Without idCreator
        categoryDto.icon = 'icon';

       expect(createCategory.execute(categoryDto)).rejects.toThrow(BadRequest);
    });

     it('Should throw an error if dont send the icon url', async () => {
        const categoryDto: CategoryDto = new CategoryDto();
        categoryDto.name = 'Category1';
        categoryDto.idCreator = 'mock123'; 
        //categoryDto.icon = 'icon'; Without icon

       expect(createCategory.execute(categoryDto)).rejects.toThrow(MissingRequiredParameters);
    });

     it('Should throw an error if dont send the name of category', async () => {
        const categoryDto: CategoryDto = new CategoryDto();
        //categoryDto.name = 'Category1'; Without name
        categoryDto.idCreator = 'mock123'; 
        categoryDto.icon = 'icon';

       expect(createCategory.execute(categoryDto)).rejects.toThrow(MissingRequiredParameters);
    });


    it('Should throw an error if are some internal errors', async () => {
        const categoryDto: CategoryDto = new CategoryDto();
        categoryDto.name = 'Category1';
        categoryDto.idCreator = 'mock123';
        categoryDto.icon = 'icon';
        
        mockRepo.create = jest.fn().mockReturnValue(false);

       expect(createCategory.execute(categoryDto)).rejects.toThrow(InvalidParameters);
    });
});
