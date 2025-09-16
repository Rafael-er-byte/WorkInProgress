import type IDManager from "../../../shared/interfaces/IDManager";
import Category from "../../model/types/Category";
import type iCategoryRepository from "../interfaces/iRepository";

export default class GetCategoryById{
    constructor(private readonly repo: iCategoryRepository, private readonly idManager:IDManager){}

    async execute(id:string, idCreator:string):Promise<Category | undefined>{
        if(!this.idManager.validateId(idCreator) || !this.idManager.validateId(id))throw new Error('Invalid data');
        return await this.repo.getById(id, idCreator);
    }
};  