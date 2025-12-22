import type CategoryFilterDto from "../dtos/in/CategoryFilterDto";
import type Category from "../../core/model/Category";
import ResponseCategoryDto from "../dtos/out/ResponseCategoryDto";
import type iCategoryRepository from "../contracts/repository/iRepository";
import InvalidParameters from "../../../../shared/core/errors/InvalidParameters";

export default class GetAllCategories{
    constructor(
        private readonly repo:iCategoryRepository
    ){}

    async execute(categoryFilterDto:CategoryFilterDto):Promise<ResponseCategoryDto[]>{
        if(!categoryFilterDto.idCreator)throw new InvalidParameters('Invalid id of creator', {idCreator: categoryFilterDto.idCreator});
        let categories: Category[] = [];

        categories = await this.repo.getAll(categoryFilterDto);

        let categoriesResponse: ResponseCategoryDto[] = categories.map(c => {
                const category:ResponseCategoryDto = new ResponseCategoryDto(c.getName(), c.getIdCategory(), c.getIdCreator(), c.getCreatedAt() as string);
                return category;
        });
        
        return categoriesResponse; 
    }
};
