import Category from "../../core/model/Category";
import type CategoryFilterDto from "../dtos/in/CategoryFilterDto";
import ResponseCategoryDto from "../dtos/out/ResponseCategoryDto";
import GetCategories from "../services/GetCategories.service";
import { mockRepo } from "./mocks/repository/MockRepository";

describe('Get categories service tests', () => {
    let service: GetCategories;
    let validResponse: ResponseCategoryDto = new ResponseCategoryDto('category1', 'idCategory', 'http://icon.com');
    const category: Category = new Category('category1', 'idCreator', 'idCategory', 'http://icon.com');

    beforeEach(() => {
        service = new GetCategories(mockRepo);
    });

    it('Should return a ResponseCategoryDto with all the categories that match with the filters', async () => {
        mockRepo.getAll = jest.fn().mockReturnValue([category]);

        let filter: CategoryFilterDto = {
            idCreator:'idCreator',
            limit: 40,
            page:1,
            titleLike:'title',
            orderBy: 'a-z'
        }

        let response = await service.execute(filter);

        expect(response).toStrictEqual([validResponse]);
    });
});
