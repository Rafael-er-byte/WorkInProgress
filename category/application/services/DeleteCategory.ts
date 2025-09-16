import type IDManager from "../../../shared/interfaces/IDManager";
import type iCategoryRepository from "../interfaces/iRepository";

export default class DeleteCategoryById{
    constructor(private readonly repo:iCategoryRepository, private readonly idManager:IDManager){}

    async execute(id:string, idCreator:string):Promise<void>{
        if(!this.idManager.validateId(idCreator) || !this.idManager.validateId(id))throw new Error('Invalid data');
        const result:boolean = await this.repo.delete(id, idCreator);
        if(!result)throw new Error("Not found");
    }
}