import BadRequest from "../../../../shared/errors/api/BadRequest";
import NotFound from "../../../../shared/errors/api/NotFound";
import ServiceUnavailable from "../../../../shared/errors/api/ServiceUnavailable";
import type IDManager from "../../../shared/contracts/IDManager";
import Action from "../dtos/out/ActionDto";
import type iSearchRepository from "../interfaces/cache/iSearchRepsitory";
import type iMessenger from "../interfaces/messaging/iMessenger";
import type iCategoryRepository from "../interfaces/repository/iRepository";

export default class DeleteCategoryById{
    constructor(
        private readonly repo:iCategoryRepository, 
        private readonly idManager:IDManager, 
        private readonly search: iSearchRepository,
        private readonly messenger: iMessenger
    ){}

    async execute(id:string, idCreator:string):Promise<Action>{
        if(!this.idManager.validateId(idCreator) || !this.idManager.validateId(id))throw new BadRequest('Invalid data');
        if(!await this.repo.getById(id, idCreator)) throw new NotFound('Category not found');
        
        let repoSuccess: boolean = false;
        let searchSuccess: boolean = false;

        try {
            [repoSuccess, searchSuccess] = await Promise.all([
                this.repo.delete(id, idCreator),
                this.search.delete(id)
            ]);

        } catch (error) {
            if(error instanceof ServiceUnavailable && repoSuccess){
                await this.messenger.deleteCategoryLater(id);
            }else throw error;
        }

        const action:Action = new Action(true, id);
        return action;
    }
};
