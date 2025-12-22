import CategoryDto from "../dtos/in/CategryDto";
import Category from "../../core/model/Category";
import Action from "../dtos/out/ActionDto";
import type iCategoryRepository from "../contracts/repository/iRepository";
import InvalidParameters from "../../../../shared/core/errors/InvalidParameters";

export default class UpdateCategory{
    constructor(
        private readonly repo: iCategoryRepository
    ){}

    async execute(categoryDto:CategoryDto): Promise<Action>{
        if(!categoryDto.idCreator && !categoryDto.idCategory)throw new InvalidParameters('Invalid id of creator or id of category', {idCreator: categoryDto.idCreator, id: categoryDto.idCategory});
        const category:Category = new Category(categoryDto.name, categoryDto.idCreator, categoryDto.idCategory, categoryDto.createdAt as string, categoryDto.icon);
    
        let savedOnRepo: boolean = await this.repo.update(category);
        if(!savedOnRepo)throw new InvalidParameters('Some pareameters are invalid', categoryDto);

        const action:Action = new Action(true, categoryDto.idCategory);
        return action;
    }
};
