import type DateManager from "../../../shared/interfaces/DateManager";
import type IDManager from "../../../shared/interfaces/IDManager";
import CategoryDto from "../dtos/CategryDto";
import Category from "../../model/types/Category";
import type iCategoryRepository from "../interfaces/iRepository";
import BadRequest from "../../../shared/exceptions/BadRequest";

export default class SaveCategory{
    constructor(private readonly repo: iCategoryRepository, private readonly idManager:IDManager, private readonly dateManager:DateManager){}

    async execute(categoryDto:CategoryDto){
        if(!categoryDto.idCategory){
            categoryDto.createdAt = this.dateManager.generate();
            categoryDto.idCategory = this.idManager.generateId();
        }else if(!this.idManager.validateId(categoryDto.idCategory)) throw new BadRequest('Invalid data');
        if(!this.idManager.validateId(categoryDto.idCreator))throw new BadRequest('Invalid data');
        const category:Category = new Category(categoryDto.name, categoryDto.idCreator, categoryDto.idCategory, categoryDto.createdAt);
        await this.repo.save(category);
    }
};