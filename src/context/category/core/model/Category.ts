import IdCategory from "../objects/IdCategory";
import idProject from "../../../project/core/objects/IdProject";
import DateTime from "../../../shared/core/objects/DateTime";
import CategoryName from "../objects/CategoryName";
import Entity from "../../../shared/core/model/Entity";
import CategoryColor from "../objects/CategoryColor";
import type { AllowedColors } from "../types/AllowedColors";
import CategoryCreated from "../events/CategoryCreated";
import Contributor from "../../../shared/core/objects/Contributor";
import type iCategoryParams from "../interfaces/iCategoryParams";
import CategoryNameChanged from "../events/CategoryNameChanged";
import CategoryColorChanged from "../events/CategoryColorChanged";

export default class Category extends Entity{
    private name!: CategoryName;
    private color!: CategoryColor;
    private readonly idCategory!: IdCategory;
    private readonly idProject!: idProject;
    private readonly createdAt!: DateTime;

    private constructor(idCategory: IdCategory, name: CategoryName, color: CategoryColor, idProject: idProject, createdAt: DateTime) {
        super();

        this.name = name;
        this.color = color;
        this.idCategory = idCategory;
        this.idProject = idProject;
        this.createdAt = createdAt;
    }

    public static create(id: string, name:string, color: string, idProject: idProject, createdAt:string, modifier: Contributor){
        const idCategory = new IdCategory(id);
        const category = new Category(idCategory, new CategoryName(name), new CategoryColor(color as AllowedColors), idProject, DateTime.create(createdAt));
        category.addEvent(new CategoryCreated(DateTime.now(), modifier, idProject, idCategory));
        return category;
    }

    public static fromPrimitives(params:iCategoryParams){
        return new Category(new IdCategory(params.id), new CategoryName(params.name), new CategoryColor(params.color as AllowedColors), params.idProject, DateTime.create(params.createdAt.toISOString()));
    }
    
    public updateName(name: CategoryName, modifier: Contributor): void {
        this.name = name;
        this.addEvent(new CategoryNameChanged(DateTime.now(), modifier, this.idProject, this.idCategory, name));
    }

    public updateColor(color: CategoryColor, modifier: Contributor): void{
        this.color = color;
        this.addEvent(new CategoryColorChanged(DateTime.now(), modifier, this.idProject, this.idCategory, color));
    }

    public toPrimitives(): iCategoryParams {
        return {
            id: this.idCategory.getID(),
            idProject: this.idProject,
            name: this.name.getName(),
            color: this.color.getColor(),
            createdAt: this.createdAt.getDate()
        }
    }
};
