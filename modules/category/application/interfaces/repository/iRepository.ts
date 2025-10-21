import type Category from "../../../core/model/Category";
import type CategoryFilterDto from "../../dtos/in/CategoryFilterDto";

export default interface iCategoryRepository{
    create(category:Category): Promise<void>
    update(category:Category): Promise<void>
    getAll(categoryFilterDto:CategoryFilterDto): Promise<Category[]>
    getById(categoryId: Category['idCategory'], idCreator:Category['idCreator']): Promise<Category | undefined>
    delete(categoryId: Category['idCategory'], idCreator:Category['idCreator']): Promise<boolean>
};
