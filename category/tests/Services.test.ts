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
        saveCategory = new SaveCategory(mockRepo as iCategoryRepository);
    });

    it('Should create a new category', async () => {
        const dto:CategoryDto = new CategoryDto;
        dto.idCreator ='1234';
        dto.name = 'Projects';

        await saveCategory.execute(dto);

        expect(mockRepo.save).toHaveBeenCalledWith(expect.objectContaining({
            idCategory: expect.any(String),
            idCreator: '1234',
            name: 'Projects',
            createdAt: expect.any(String)
        }));
    });


});