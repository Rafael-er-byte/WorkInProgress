import type IDManager from "../../../shared/interfaces/IDManager";
import CategoryDto from "../../dtos/CategryDto";
import Category from "../../model/Category";
import type iCategoryRepository from "../adapters/iRepository";

export default class GetCategoryById{
    constructor(private readonly repo: iCategoryRepository, private readonly idManager:IDManager){}

    async execute(categoryDto:CategoryDto):Promise<Category | undefined>{
        if(!this.idManager.validateId(categoryDto.idCreator) || !this.idManager.validateId(categoryDto.idCategory))throw new Error('Invalid data');
        return await this.repo.getById(categoryDto.idCategory as string, categoryDto.idCreator);
    }
};  