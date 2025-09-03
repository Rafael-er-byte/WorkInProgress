import GenerateId from "../../../shared/GenerateId";
import CategoryDto from "../../dtos/CategryDto";
import Category from "../../model/Category";
import type iCategoryRepository from "../adapters/iRepository";

export default class SaveCategory{
    constructor(private repo: iCategoryRepository){}

    execute(categoryDto:CategoryDto){
        try{
            if(!categoryDto.createdAt)categoryDto.createdAt = new Date().toISOString();
            if(!categoryDto.idCategory)categoryDto.idCategory = GenerateId.createId()
            const category:Category = new Category(categoryDto.name, categoryDto.idCreator, categoryDto.createdAt);
            this.repo.save(category);
        }catch(err){
            throw err
        }
    }
};