import type CategoryFilterDto from "../dtos/CategoryFilterDto";
import type Category from "../../core/model/Category";

export default interface iCategoryRepository{
    save(category:Category): Promise<void>
    getAll(categoryId:string, idCreator:string, categoryFilterDto:CategoryFilterDto): Promise<Category[]>
    getById(categoryId:string, idCreator:string): Promise<Category | undefined>
    delete(categoryId:string, idCreator:string): Promise<boolean>
};
