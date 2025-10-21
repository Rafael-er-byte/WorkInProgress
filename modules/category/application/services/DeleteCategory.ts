import BadRequest from "../../../../shared/errors/api/BadRequest";
import NotFound from "../../../../shared/errors/api/NotFound";
import type IDManager from "../../../shared/contracts/IDManager";
import Action from "../dtos/out/ActionDto";
import type iCategoryRepository from "../interfaces/repository/iRepository";

export default class DeleteCategoryById{
    constructor(private readonly repo:iCategoryRepository, private readonly idManager:IDManager){}

    async execute(id:string, idCreator:string):Promise<Action>{
        if(!this.idManager.validateId(idCreator) || !this.idManager.validateId(id))throw new BadRequest('Invalid data');
        const result:boolean = await this.repo.delete(id, idCreator);
        if(!result)throw new NotFound('Not found category');
        const action:Action = new Action(true, id);
        return action;
    }
};
