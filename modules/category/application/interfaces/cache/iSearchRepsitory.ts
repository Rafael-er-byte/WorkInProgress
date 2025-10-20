import type Category from "../../../core/model/Category";
import type CategoryFilterDto from "../../dtos/in/CategoryFilterDto";
import type CategoryDto from "../../dtos/in/CategryDto";
import type Action from "../../dtos/out/ActionDto";

export default interface iSearchRepository{
    create(category:Category): Promise<Action>
    update(category: Category): Promise<Action>
    delete(category: Category): Promise<Action>
    search(categoryDto:CategoryDto, categoryFilterDto: CategoryFilterDto): Promise<Category[]>
};
