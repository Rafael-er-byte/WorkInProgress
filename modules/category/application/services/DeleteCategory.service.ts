import BadRequest from "../../../../shared/errors/api/BadRequest";
import NotFound from "../../../../shared/errors/api/NotFound";
import type IDManager from "../../../shared/contracts/IDManager";
import Action from "../dtos/out/ActionDto";
import type iCategoryRepository from "../interfaces/repository/iRepository";

export default class DeleteCategoryById{
    constructor(
        private readonly repo:iCategoryRepository, 
        private readonly idManager:IDManager, 
    ){}

    async execute(id:string, idCreator:string):Promise<Action>{
        if(!this.idManager.validateId(idCreator) || !this.idManager.validateId(id))throw new BadRequest('Invalid data');
        if(!await this.repo.getById(id, idCreator)) throw new NotFound('Category not found');
        
        await this.repo.delete(id, idCreator);

        const action:Action = new Action(true, id);
        return action;
    }
};
