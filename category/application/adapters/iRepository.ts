import type Category from "../../model/Category";

export default interface iCategoryRepository{
    save(category:Category): Promise<void>
    getAll(category:Category, limit: number, page:number): Promise<Category[]>
    getById(category:Category): Promise<Category | undefined>
    delete(category:Category): Promise<void>
};