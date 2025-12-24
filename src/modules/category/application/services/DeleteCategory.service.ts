import CoreError from "../../../../shared/core/errors/CoreError";
import InvalidParameters from "../../../../shared/core/errors/InvalidParameters";
import OperationNotAllowed from "../../../../shared/core/errors/OperationNotAllowed";
import ResourceNotFoud from "../../../../shared/core/errors/ResourceNotFound";
import type iCategoryRepository from "../contracts/repository/iRepository";
import type TaskService from "../contracts/services/TaskService";
import Action from "../dtos/out/ActionDto";

export default class DeleteCategoryById{
    constructor(
        private readonly repo:iCategoryRepository,
        private readonly taskService: TaskService
    ){}

    async execute(id:string, idCreator:string):Promise<Action>{
        if(!idCreator || !id)throw new InvalidParameters('Invalid id of creator or id of category', {idCreator: idCreator, id: id});
        
        if(await this.taskService.isCategoryInUse(id))throw new OperationNotAllowed('The category is currently in use');

        const category = await this.repo.getById(id);
        if(!category) throw new ResourceNotFoud('Category', {idCreator: idCreator, id: id});
        if(category.getIdCreator() !== idCreator)throw new OperationNotAllowed('Not allowed');

        const deleted = await this.repo.delete(id);
        if(!deleted)throw new CoreError('Cannot delete the category at the moment', {id: id, idCreator: idCreator});

        const action:Action = new Action(true, id);
        return action;
    }
};
