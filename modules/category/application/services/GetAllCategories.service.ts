import type IDManager from "../../../shared/contracts/IDManager";
import type CategoryFilterDto from "../dtos/in/CategoryFilterDto";
import type Category from "../../core/model/Category";
import type iCategoryRepository from "../interfaces/repository/iRepository";
import type iSearchRepository from "../interfaces/cache/iSearchRepsitory";
import ResponseCategoryDto from "../dtos/out/ResponseCategoryDto";
import AppError from "../../../../shared/errors/api/AppError";
import BadRequest from "../../../../shared/errors/api/BadRequest";

export default class GetAllCategories{
    constructor(
        private readonly repo:iCategoryRepository, 
        private readonly idManager:IDManager,
        private readonly search: iSearchRepository
    ){}

    async execute(categoryFilterDto:CategoryFilterDto):Promise<ResponseCategoryDto[]>{
        if(!this.idManager.validateId(categoryFilterDto.idCreator) || !categoryFilterDto.limit || !categoryFilterDto.page)throw new BadRequest('Invalid data');
            let categories: Category[] = [];

        try {
            categories = await this.search.search(categoryFilterDto);
        } catch (error) {
            if(error instanceof AppError && error.code === 500){
                categories = await this.repo.getAll(categoryFilterDto);
            }else throw error;
        }

        let categoriesResponse: ResponseCategoryDto[] = categories.map(c => {
                const category:ResponseCategoryDto = new ResponseCategoryDto(c.getName(), c.getIdCategory(), c.getIdCreator(), c.getCreatedAt() as string);
                return category;
        });
        
        return categoriesResponse; 
    }
};
