import InvalidParameters from "../../../../shared/errors/InvalidParameters";
import ResourceNotFoud from "../../../../shared/errors/ResourceNotFound";
import type IDManager from "../../../contracts/utils/IDManager";
import type iCategoryRepository from "../contracts/repository/iRepository";
import Action from "../dtos/out/ActionDto";

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
