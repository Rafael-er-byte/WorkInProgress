import type CategoryDto from "../dtos/in/CategoryDto";
import Category from "../../core/model/Category";
import Action from "../dtos/out/ActionDto";
import type iCategoryRepository from "../contracts/repository/iRepository";
import CoreError from "../../../../shared/core/errors/CoreError";
import ResourceNotFoud from "../../../../shared/core/errors/ResourceNotFound";

export default class UpdateCategory{
    constructor(
        private readonly repo: iCategoryRepository
    ){}

    async execute(categoryDto:CategoryDto): Promise<Action>{
        const category:Category | undefined = await this.repo.getById(categoryDto.idCategory, categoryDto.idCreator);
        if(!category) throw new ResourceNotFoud('Category', categoryDto);

        category.setIcon(categoryDto.icon);
        category.setName(categoryDto.name);

        let savedOnRepo: boolean = await this.repo.update(category);
        if(!savedOnRepo)throw new CoreError('Cannot update the category at the moment', categoryDto);

        const action:Action = new Action(true, categoryDto.idCategory);
        return action;
    }
};
