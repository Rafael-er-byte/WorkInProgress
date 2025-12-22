import SaveCategory from "../services/SaveCategory.service";
import { mockRepo } from "./mocks/repository/MockRepository";
import { createIdManagerMock } from "../../../../shared/mocks/IdManagerMock";
import { createDateManagerMock } from "../../../../shared/mocks/DateManagerMock";
import type CategoryDto from "../dtos/in/CategoryDto";
import Action from "../dtos/out/ActionDto";
import Url from "../../core/objects/URL";
import InvalidParameters from "../../../../shared/core/errors/InvalidParameters";
import MissingRequiredParameters from "../../../../shared/core/errors/MissingRequiredParameters";
import CoreError from "../../../../shared/core/errors/CoreError";

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
        let categoryDto: CategoryDto = {
            name:'Category1',
            idCreator:'mock123',
            icon:'http://example.com'
        }

        const result = await createCategory.execute(categoryDto);
        expect(result).toBeInstanceOf(Action);
        expect(mockRepo.create).toHaveBeenCalledWith(
            expect.objectContaining({
                idCategory: 'mock123', 
                idCreator: 'mock123', 
                name: 'Category1', 
                createdAt: 'validDate', 
                icon: expect.any(Url)
            })
        );
    });

    it('Should throw an error if dont send the id of creator', async () => {
        let categoryDto: CategoryDto = {
            name:'Category1',
            idCreator:'',
            icon:'http://example.com'
        }

       expect(createCategory.execute(categoryDto)).rejects.toThrow(MissingRequiredParameters);
    });

     it('Should throw an error if dont send the icon url', async () => {
        let categoryDto: CategoryDto = {
            name:'Category1',
            idCreator:'mock123',
            icon:''
        }

       expect(createCategory.execute(categoryDto)).rejects.toThrow(InvalidParameters);
    });

     it('Should throw an error if dont send the name of category', async () => {
        let categoryDto: CategoryDto = {
            name:'',
            idCreator:'mock123',
            icon:'http://example.com'
        }

       expect(createCategory.execute(categoryDto)).rejects.toThrow(MissingRequiredParameters);
    });


    it('Should throw an error if are some internal errors', async () => {
        let categoryDto: CategoryDto = {
            name:'Category1',
            idCreator:'mock123',
            icon:'http://example.com'
        }
        
        mockRepo.create = jest.fn().mockReturnValue(false);

       expect(createCategory.execute(categoryDto)).rejects.toThrow(CoreError);
    });
});
