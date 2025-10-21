import type IDManager from "../../../shared/contracts/IDManager";
import type CategoryFilterDto from "../dtos/in/CategoryFilterDto";
import type CategoryDto from "../dtos/in/CategryDto";
import type Category from "../../core/model/Category";
import type iCategoryRepository from "../interfaces/repository/iRepository";
import BadRequest from "../../../../shared/errors/BadRequest";

export default class GetAllCategories{
    constructor(private readonly repo:iCategoryRepository, private readonly idManager:IDManager){}

    async execute(categoryDto:CategoryDto, categoryFilterDto:CategoryFilterDto):Promise<Category[]>{
        if(!this.idManager.validateId(categoryDto.idCreator) || !this.idManager.validateId(categoryDto.idCategory) || !categoryFilterDto.limit || !categoryFilterDto.page)throw new BadRequest('Invalid data');
        const categories:Category[] = await this.repo.getAll(categoryDto.idCategory, categoryDto.idCreator, categoryFilterDto);
        return categories; 
    }
};
