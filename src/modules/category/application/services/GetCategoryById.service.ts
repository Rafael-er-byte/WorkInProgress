import InvalidParameters from "../../../../shared/core/errors/InvalidParameters";
import ResourceNotFoud from "../../../../shared/core/errors/ResourceNotFound";
import Category from "../../core/model/Category";
import type iCategoryRepository from "../contracts/repository/iRepository";
import ResponseCategoryDto from "../dtos/out/ResponseCategoryDto";

export default class GetCategoryById{
    constructor(private readonly repo: iCategoryRepository){}

    async execute(id:string, idCreator:string):Promise<ResponseCategoryDto>{
        if(!id && !idCreator)throw new InvalidParameters('Invalid id of creator or id of category', {idCategory: id, idCreator: idCreator});
        
        const category: Category | undefined = await this.repo.getById(id, idCreator);
        if(!category)throw new ResourceNotFoud('Category doesnt exists', id);
        
        const response: ResponseCategoryDto = new ResponseCategoryDto(category.getName(), category.getIdCategory(), category.getCreatedAt() as string, category.getIcon());
        return response;
    }
};  
