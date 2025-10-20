import BadRequest from "../../../../shared/errors/api/BadRequest";
import type IDManager from "../../../../shared/interfaces/IDManager";
import Category from "../../core/model/Category";
import ResponseCategoryDto from "../dtos/out/ResponseCategoryDto";
import type iCategoryRepository from "../interfaces/repository/iRepository";

export default class GetCategoryById{
    constructor(private readonly repo: iCategoryRepository, private readonly idManager:IDManager){}

    async execute(id:string, idCreator:string):Promise<ResponseCategoryDto>{
        if(!this.idManager.validateId(idCreator) || !this.idManager.validateId(id))throw new BadRequest('Invalid data');
        const category: Category | undefined = await this.repo.getById(id, idCreator);
        if(!category)throw new BadRequest('Category doesnt exists', id);
        const response: ResponseCategoryDto = new ResponseCategoryDto(category.getName(), category.getIdCreator(), category.getIdCategory());
        return response;
    }
};  
