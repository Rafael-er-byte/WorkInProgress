import type CategoryFilterDto from "../dtos/CategoryFilterDto";
import type Category from "../../core/model/Category";

export default interface iCategoryRepository{
    save(category:Category): Promise<void>
    getAll(categoryId: Category['idCategory'], idCreator:Category['idCreator'], categoryFilterDto:CategoryFilterDto): Promise<Category[]>
    getById(categoryId: Category['idCategory'], idCreator:Category['idCreator']): Promise<Category | undefined>
    delete(categoryId: Category['idCategory'], idCreator:Category['idCreator']): Promise<boolean>
};
