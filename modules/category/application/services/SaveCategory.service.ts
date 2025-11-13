import type DateManager from "../../../shared/contracts/DateManager";
import type IDManager from "../../../shared/contracts/IDManager";
import CategoryDto from "../dtos/in/CategryDto";
import Category from "../../core/model/Category";
import Action from "../dtos/out/ActionDto";
import type iCategoryRepository from "../contracts/repository/iRepository";
import InvalidParameters from "../../../shared/errors/InvalidParameters";

export default class SaveCategory{
    constructor(
        private readonly repo: iCategoryRepository, 
        private readonly idManager:IDManager, 
        private readonly dateManager:DateManager
    ){}

    async execute(categoryDto:CategoryDto): Promise<Action>{
        categoryDto.createdAt = this.dateManager.generate();
        categoryDto.idCategory = this.idManager.generateId();

        if(!this.idManager.validateId(categoryDto.idCreator)) throw new InvalidParameters('Invalid id of creator or id of category', {idCreator: categoryDto.idCreator});
        const category:Category = new Category(categoryDto.name, categoryDto.idCreator, categoryDto.idCategory, categoryDto.createdAt, categoryDto.icon);
    
        const savedOnRepo: boolean = await this.repo.create(category);

        if(!savedOnRepo)throw new InvalidParameters('Some pareameters are invalid', categoryDto);
        const action:Action = new Action(true, categoryDto.idCategory);
        return action;
    }
};
