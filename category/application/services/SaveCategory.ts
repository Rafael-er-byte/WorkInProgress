import type IDManager from "../../../shared/interfaces/IDManager";
import CategoryDto from "../../dtos/CategryDto";
import Category from "../../model/Category";
import type iCategoryRepository from "../adapters/iRepository";

export default class SaveCategory{
    constructor(private repo: iCategoryRepository, private idManager:IDManager){}

    async execute(categoryDto:CategoryDto){
        if((!categoryDto.createdAt || categoryDto.createdAt === '') && (!categoryDto.idCategory || categoryDto.idCategory === ''))categoryDto.createdAt = new Date().toISOString();
        if(!this.idManager.validateId(categoryDto.idCategory))categoryDto.idCategory = this.idManager.generateId();
        if(!this.idManager.validateId(categoryDto.idCreator))throw new Error('Invalid data');
        const category:Category = new Category(categoryDto.name, categoryDto.idCreator, categoryDto.idCategory as string, categoryDto.createdAt);
        await this.repo.save(category);
    }
};