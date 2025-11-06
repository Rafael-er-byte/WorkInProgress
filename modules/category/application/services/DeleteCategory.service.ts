import InvalidParameters from "../../../../shared/errors/core/InvalidParameters";
import ResourceNotFoud from "../../../../shared/errors/core/ResourceNotFound";
import type IDManager from "../../../shared/contracts/IDManager";
import Action from "../dtos/out/ActionDto";
import type iCategoryRepository from "../interfaces/repository/iRepository";

export default class DeleteCategoryById{
    constructor(
        private readonly repo:iCategoryRepository, 
        private readonly idManager:IDManager, 
    ){}

    async execute(id:string, idCreator:string):Promise<Action>{
        if(!this.idManager.validateId(idCreator) || !this.idManager.validateId(id))throw new InvalidParameters('Invalid id of creator or id of category', {idCreator: idCreator, id: id});
        if(!await this.repo.existsById(id, idCreator)) throw new ResourceNotFoud('Category', {idCreator: idCreator, id: id});
        
        await this.repo.delete(id, idCreator);

        const action:Action = new Action(true, id);
        return action;
    }
};
