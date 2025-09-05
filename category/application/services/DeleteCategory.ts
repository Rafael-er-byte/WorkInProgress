import type CategoryDto from "../../dtos/CategryDto";
import type iCategoryRepository from "../adapters/iRepository";

export default class DeleteCategoryById{
    constructor(private repo:iCategoryRepository){}

    async execute(categoryDto:CategoryDto):Promise<void>{
        if(!categoryDto.idCategory || !categoryDto.idCreator)throw new Error('Invalid data');
        const result:boolean = await this.repo.delete(categoryDto.idCategory, categoryDto.idCreator);
        if(!result)throw new Error("Not found");
    }
}