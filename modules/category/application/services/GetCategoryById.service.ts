import type IDManager from "../../../shared/contracts/IDManager";
import InvalidParameters from "../../../shared/errors/InvalidParameters";
import ResourceNotFoud from "../../../shared/errors/ResourceNotFound";
import Category from "../../core/model/Category";
import type iCategoryRepository from "../contracts/repository/iRepository";
import ResponseCategoryDto from "../dtos/out/ResponseCategoryDto";

export default class GetCategoryById{
    constructor(private readonly repo: iCategoryRepository, private readonly idManager:IDManager){}

    async execute(id:string, idCreator:string):Promise<ResponseCategoryDto>{
        if(!this.idManager.validateId(idCreator) || !this.idManager.validateId(id))throw new InvalidParameters('Invalid id of creator or id of category', {idCreator: idCreator, id: id});
        
        const category: Category | undefined = await this.repo.getById(id, idCreator);
        if(!category)throw new ResourceNotFoud('Category doesnt exists', id);
        
        const response: ResponseCategoryDto = new ResponseCategoryDto(category.getName(), category.getIdCreator(), category.getIdCategory(), category.getCreatedAt() as string);
        return response;
    }
};  
