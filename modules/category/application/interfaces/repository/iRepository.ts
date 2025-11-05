import type Category from "../../../core/model/Category";
import type CategoryFilterDto from "../../dtos/in/CategoryFilterDto";

export default interface iCategoryRepository{
    create(category:Category): Promise<boolean>
    update(category:Category): Promise<boolean>
    getAll(categoryFilterDto:CategoryFilterDto): Promise<Category[]>
    getById(categoryId: Category['idCategory'], idCreator:Category['idCreator']): Promise<Category | undefined>
    delete(categoryId: Category['idCategory'], idCreator:Category['idCreator']): Promise<boolean>
    existsById(categoryId: Category['idCategory'], idCreator: Category['idCreator']): Promise<boolean>
};
