import CoreError from "../../../../shared/core/errors/CoreError";
import InvalidParameters from "../../../../shared/core/errors/InvalidParameters";
import ResourceNotFoud from "../../../../shared/core/errors/ResourceNotFound";
import Unauthorized from "../../../../shared/core/errors/Unauthorized";
import type iCategoryRepository from "../contracts/repository/iRepository";
import Action from "../dtos/out/ActionDto";

export default class DeleteCategoryById{
    constructor(
        private readonly repo:iCategoryRepository
    ){}

    async execute(id:string, idCreator:string):Promise<Action>{
        if(!idCreator || !id)throw new InvalidParameters('Invalid id of creator or id of category', {idCreator: idCreator, id: id});
        const category = await this.repo.getById(id);
        if(!category) throw new ResourceNotFoud('Category', {idCreator: idCreator, id: id});
        if(category.getIdCreator() !== idCreator)throw new Unauthorized('Not allowed');

        const deleted = await this.repo.delete(id);
        if(!deleted)throw new CoreError('Something went wrong', {id: id, idCreator: idCreator});

        const action:Action = new Action(true, id);
        return action;
    }
};
