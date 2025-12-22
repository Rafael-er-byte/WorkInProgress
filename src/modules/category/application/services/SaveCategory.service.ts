import type CategoryDto from "../dtos/in/CategoryDto";
import Category from "../../core/model/Category";
import Action from "../dtos/out/ActionDto";
import type iCategoryRepository from "../contracts/repository/iRepository";
import InvalidParameters from "../../../../shared/core/errors/InvalidParameters";
import type IDManager from "../../../contracts/utils/IDManager";
import type DateManager from "../../../contracts/utils/DateManager";

export default class SaveCategory{
    constructor(
        private readonly repo: iCategoryRepository, 
        private readonly idManager:IDManager, 
        private readonly dateManager:DateManager
    ){}

    async execute(categoryDto:CategoryDto): Promise<Action>{
        categoryDto.createdAt = this.dateManager.generate();
        categoryDto.idCategory = this.idManager.generateId();

        if(!categoryDto.idCreator && !categoryDto.idCategory)throw new InvalidParameters('Invalid id of creator or id of category', {idCreator: categoryDto.idCreator, id: categoryDto.idCategory});
        const category:Category = new Category(categoryDto.name, categoryDto.idCreator, categoryDto.idCategory, categoryDto.createdAt, categoryDto.icon);
    
        const savedOnRepo: boolean = await this.repo.create(category);

        if(!savedOnRepo)throw new InvalidParameters('Some pareameters are invalid', categoryDto);
        const action:Action = new Action(true, categoryDto.idCategory);
        return action;
    }
};
