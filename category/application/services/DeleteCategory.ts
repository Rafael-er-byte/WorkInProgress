import type IDManager from "../../../shared/interfaces/IDManager";
import type CategoryDto from "../../dtos/CategryDto";
import type iCategoryRepository from "../adapters/iRepository";

export default class DeleteCategoryById{
    constructor(private readonly repo:iCategoryRepository, private readonly idManager:IDManager){}

    async execute(categoryDto:CategoryDto):Promise<void>{
        if(!this.idManager.validateId(categoryDto.idCreator) || !this.idManager.validateId(categoryDto.idCategory))throw new Error('Invalid data');
        const result:boolean = await this.repo.delete(categoryDto.idCategory as string, categoryDto.idCreator);
        if(!result)throw new Error("Not found");
    }
}