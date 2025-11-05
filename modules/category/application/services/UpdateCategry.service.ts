import type IDManager from "../../../shared/contracts/IDManager";
import CategoryDto from "../dtos/in/CategryDto";
import Category from "../../core/model/Category";
import type iCategoryRepository from "../interfaces/repository/iRepository";
import Action from "../dtos/out/ActionDto";
import BadRequest from "../../../../shared/errors/api/BadRequest";
import AppError from "../../../../shared/errors/api/AppError";
import InvalidParameters from "../../../../shared/errors/core/InvalidParameters";
import ServiceUnavailable from "../../../../shared/errors/api/ServiceUnavailable";

export default class Updateategory{
    constructor(
        private readonly repo: iCategoryRepository, 
        private readonly idManager:IDManager
    ){}

    async execute(categoryDto:CategoryDto): Promise<Action>{
        if(!this.idManager.validateId(categoryDto.idCreator) && this.idManager.validateId(categoryDto.idCategory))throw new BadRequest('Invalid data', categoryDto);
        const category:Category = new Category(categoryDto.name, categoryDto.idCreator, categoryDto.idCategory, categoryDto.createdAt as string);
    
        let savedOnRepo: boolean;
        try {
            savedOnRepo = await this.repo.update(category);
        } catch (error) {
            throw new ServiceUnavailable('Something went wrong', error);
        }
        
        if(!savedOnRepo)throw new InvalidParameters('Some pareameters are invalid', categoryDto);

        const action:Action = new Action(true, categoryDto.idCategory);
        return action;
    }
};
