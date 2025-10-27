import type DateManager from "../../../shared/contracts/DateManager";
import type IDManager from "../../../shared/contracts/IDManager";
import CategoryDto from "../dtos/in/CategryDto";
import Category from "../../core/model/Category";
import type iCategoryRepository from "../interfaces/repository/iRepository";
import Action from "../dtos/out/ActionDto";
import type iSearchRepository from "../interfaces/cache/iSearchRepsitory";
import type iMessenger from "../interfaces/messaging/iMessenger";
import BadRequest from "../../../../shared/errors/api/BadRequest";
import AppError from "../../../../shared/errors/api/AppError";

export default class SaveCategory{
    constructor(
        private readonly repo: iCategoryRepository, 
        private readonly idManager:IDManager, 
        private readonly dateManager:DateManager,
        private readonly search:iSearchRepository,
        private readonly messenger: iMessenger
    ){}

    async execute(categoryDto:CategoryDto): Promise<Action>{
        categoryDto.createdAt = this.dateManager.generate();
        categoryDto.idCategory = this.idManager.generateId();

        if(!this.idManager.validateId(categoryDto.idCreator))throw new BadRequest('Invalid data');
        const category:Category = new Category(categoryDto.name, categoryDto.idCreator, categoryDto.idCategory, categoryDto.createdAt);
    
        let savedOnRepo: boolean = false;
        let savedOnSearch: boolean = false;

        try {
            [savedOnRepo, savedOnSearch] = await Promise.all([
                this.repo.create(category),
                this.search.create(category)
            ]);
        } catch (error) {
            if(error instanceof AppError && error.code === 500 && savedOnRepo){
                this.messenger.saveCategoryLater(category);
            }else throw error;
        }

        if(!savedOnRepo)throw new AppError('Something went wrong');

        const action:Action = new Action(true, categoryDto.idCategory);
        return action;
    }
};
