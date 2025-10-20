import type DateManager from "../../../../shared/interfaces/DateManager";
import type IDManager from "../../../../shared/interfaces/IDManager";
import CategoryDto from "../dtos/in/CategryDto";
import Category from "../../core/model/Category";
import type iCategoryRepository from "../interfaces/repository/iRepository";
import BadRequest from "../../../../shared/errors/BadRequest";

export default class SaveCategory{
    constructor(private readonly repo: iCategoryRepository, private readonly idManager:IDManager, private readonly dateManager:DateManager){}

    async execute(categoryDto:CategoryDto): Promise<void>{
        categoryDto.createdAt = this.dateManager.generate();
        categoryDto.idCategory = this.idManager.generateId();

        if(!this.idManager.validateId(categoryDto.idCreator))throw new BadRequest('Invalid data');
        const category:Category = new Category(categoryDto.name, categoryDto.idCreator, categoryDto.idCategory, categoryDto.createdAt);
        await this.repo.create(category);
    }
};
