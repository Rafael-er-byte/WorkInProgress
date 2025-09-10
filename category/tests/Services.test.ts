import UUID from "../../shared/utils/IDManagement";
import type IDManager from "../../shared/interfaces/IDManager";
import type iCategoryRepository from "../application/adapters/iRepository";
import SaveCategory from "../application/services/SaveCategory";
import CategoryDto from "../dtos/CategryDto";

describe('Testing save service', () => {
    let mockRepo:Partial<jest.Mocked<iCategoryRepository>>;
    let saveCategory:SaveCategory;

    beforeEach(() => {
        mockRepo = {
            save:jest.fn()
        };

        const idManager:IDManager = new UUID();

        saveCategory = new SaveCategory(mockRepo as iCategoryRepository, idManager);
    });

    it('Should add an id an a creation date to the object', async () => {
        const dto:CategoryDto = new CategoryDto;
        dto.idCreator ='f47ac10b-58cc-4372-a567-0e02b2c3d479';
        dto.name = 'Projects';

        await saveCategory.execute(dto);

        expect(mockRepo.save).toHaveBeenCalledWith(expect.objectContaining({
            idCategory: expect.any(String),
            idCreator: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
            name: 'Projects',
            createdAt: expect.any(String)
        }));
    });

    it('Should not modify any of parameters', async () => {
        const dto:CategoryDto = new CategoryDto;
        dto.createdAt = '2025-09-04T20:15:30.123Z';
        dto.idCategory = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
        dto.idCreator = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
        dto.name = 'Projects';

        await saveCategory.execute(dto);

        expect(mockRepo.save).toHaveBeenCalledWith(expect.objectContaining({
            idCategory: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
            idCreator: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
            name: 'Projects',
            createdAt: '2025-09-04T20:15:30.123Z'
        }));
    });

    it('Should throw an error if not provide the creator id', async () => {
        const dto:CategoryDto = new CategoryDto;
        dto.createdAt = '2025-09-04T20:15:30.123Z';
        dto.idCategory = '1234f47ac10b-58cc-4372-a567-0e02b2c3d479';
        dto.idCreator = '';
        dto.name = 'Projects';

        await expect(saveCategory.execute(dto))
        .rejects
        .toThrow('Invalid data');    
    });

    it('Should throw a error if the id of category is invalid', async () => {
        const dto:CategoryDto = new CategoryDto;
        dto.createdAt = '2025-09-04T20:15:30.123Z';
        dto.idCategory = '1234';
        dto.idCreator = '1234f47ac10b-58cc-4372-a567-0e02b2c3d479';
        dto.name = 'Projects';

        await expect(saveCategory.execute(dto))
        .rejects
        .toThrow('Invalid data');    
    });
});