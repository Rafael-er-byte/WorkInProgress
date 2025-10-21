import BadRequest from "../../../../shared/errors/api/BadRequest";
import NotFound from "../../../../shared/errors/api/NotFound";
import AppError from "../../../../shared/errors/AppError";
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
        const [deletedFromRepo, deletedFromSearchEngine] = await Promise.all([
            this.repo.delete(id, idCreator),
            this.search.delete(id)
        ]);

        if(!deletedFromRepo) throw new AppError('Something went wrong');
        if(!deletedFromSearchEngine) await this.messenger.deleteCategoryLater(id);
        
        const action:Action = new Action(true, id);
        return action;
    }
};
