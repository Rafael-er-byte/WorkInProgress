import type Category from "../../../core/model/Category";
import type Action from "../../dtos/out/ActionDto";

export default interface iMessenger{
    saveCategoryLater(category:Category): Promise<Action>
    updateCategoryLater(category:Category): Promise<Action>
};
