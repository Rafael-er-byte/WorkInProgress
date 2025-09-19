import type IDManager from "../../../shared/interfaces/IDManager";
import type CategoryFilterDto from "../dtos/CategoryFilterDto";
import type CategoryDto from "../dtos/CategryDto";
import type Category from "../../model/types/Category";
import type iCategoryRepository from "../interfaces/iRepository";
import BadRequest from "../../../shared/exceptions/BadRequest";

export default class GetAllCategories{
    constructor(private readonly repo:iCategoryRepository, private readonly idManager:IDManager){}

    async execute(categoryDto:CategoryDto, categoryFilterDto:CategoryFilterDto):Promise<Category[]>{
        if(!this.idManager.validateId(categoryDto.idCreator) || !this.idManager.validateId(categoryDto.idCategory) || !categoryFilterDto.limit || !categoryFilterDto.page)throw new BadRequest('Invalid data');
        const categories:Category[] = await this.repo.getAll(categoryDto.idCategory, categoryDto.idCreator, categoryFilterDto);
        return categories; 
    }
};