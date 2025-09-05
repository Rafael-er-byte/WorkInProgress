import GenerateId from "../../../shared/utils/GenerateId";
import CategoryDto from "../../dtos/CategryDto";
import Category from "../../model/Category";
import type iCategoryRepository from "../adapters/iRepository";

export default class SaveCategory{
    constructor(private repo: iCategoryRepository){}

    async execute(categoryDto:CategoryDto){
        if(!categoryDto.createdAt)categoryDto.createdAt = new Date().toISOString();
        if(!categoryDto.idCategory)categoryDto.idCategory = GenerateId.createId();
        const category:Category = new Category(categoryDto.name, categoryDto.idCreator, categoryDto.idCategory, categoryDto.createdAt);
        await this.repo.save(category);
    }
};