import CategoryDto from "../../dtos/CategryDto";
import Category from "../../model/Category";
import type iCategoryRepository from "../adapters/iRepository";

export default class GetCategoryById{
    constructor(private repo: iCategoryRepository){}

    async execute(categoryDto:CategoryDto):Promise<Category | undefined>{
        if(!categoryDto.idCategory || !categoryDto.idCreator)throw new Error('Invalid data');
        return await this.repo.getById(categoryDto.idCategory, categoryDto.idCreator);
    }
};  