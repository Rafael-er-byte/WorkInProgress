import InvalidParameters from "../../../../shared/core/errors/InvalidParameters";
import ResourceNotFoud from "../../../../shared/core/errors/ResourceNotFound";
import type IDManager from "../../../contracts/utils/IDManager";
import Category from "../../core/model/Category";
import type iCategoryRepository from "../contracts/repository/iRepository";
import ResponseCategoryDto from "../dtos/out/ResponseCategoryDto";

export default class GetCategoryById{
    constructor(private readonly repo: iCategoryRepository, private readonly idManager:IDManager){}

    async execute(id:string, idCreator:string):Promise<ResponseCategoryDto>{
        if(!id && !idCreator)throw new InvalidParameters('Invalid id of creator or id of category', {idCategory: id, idCreator: idCreator});
        
        const category: Category | undefined = await this.repo.getById(id, idCreator);
        if(!category)throw new ResourceNotFoud('Category doesnt exists', id);
        
        const response: ResponseCategoryDto = new ResponseCategoryDto(category.getName(), category.getIdCreator(), category.getIdCategory(), category.getCreatedAt() as string);
        return response;
    }
};  
