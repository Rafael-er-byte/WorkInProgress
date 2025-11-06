import InvalidParameters from "../../../../shared/errors/core/InvalidParameters";
import ResourceNotFoud from "../../../../shared/errors/core/ResourceNotFound";
import type IDManager from "../../../shared/contracts/IDManager";
import Category from "../../core/model/Category";
import ResponseCategoryDto from "../dtos/out/ResponseCategoryDto";
import type iCategoryRepository from "../interfaces/repository/iRepository";

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
