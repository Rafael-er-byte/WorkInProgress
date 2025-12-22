import InvalidParameters from "../../../../shared/core/errors/InvalidParameters";
import ResourceNotFoud from "../../../../shared/core/errors/ResourceNotFound";
import type iCategoryRepository from "../contracts/repository/iRepository";
import Action from "../dtos/out/ActionDto";

export default class DeleteCategoryById{
    constructor(
        private readonly repo:iCategoryRepository
    ){}

    async execute(id:string, idCreator:string):Promise<Action>{
        if(!idCreator || !id)throw new InvalidParameters('Invalid id of creator or id of category', {idCreator: idCreator, id: id});
        if(!await this.repo.existsById(id, idCreator)) throw new ResourceNotFoud('Category', {idCreator: idCreator, id: id});
        
        await this.repo.delete(id, idCreator);

        const action:Action = new Action(true, id);
        return action;
    }
};
