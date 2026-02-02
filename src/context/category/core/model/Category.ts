import IdCategory from "../objects/IdCategory";
import DateTime from "../../../shared/core/objects/DateTime";
import CategoryName from "../objects/CategoryName";
import Entity from "../../../shared/core/model/Entity";
import CategoryColor from "../objects/CategoryColor";
import type { AllowedColors } from "../types/AllowedColors";
import CategoryCreated from "../events/CategoryCreated";
import type iCategoryParams from "../interfaces/iCategoryParams";
import CategoryNameChanged from "../events/CategoryNameChanged";
import CategoryColorChanged from "../events/CategoryColorChanged";
import IdProject from "../../../project/core/objects/IdProject";
import type Member from "../../../member/core/model/Member";
import Unauthorized from "../../../shared/core/errors/Unauthorized";

export default class Category extends Entity{
    private name!: CategoryName;
    private color!: CategoryColor;
    private readonly idCategory!: IdCategory;
    private readonly idProject!: IdProject;
    private readonly createdAt!: DateTime;

    private constructor(idCategory: IdCategory, name: CategoryName, color: CategoryColor, idProject: IdProject, createdAt: DateTime) {
        super();

        this.name = name;
        this.color = color;
        this.idCategory = idCategory;
        this.idProject = idProject;
        this.createdAt = createdAt;
    }

    public static create(id: string, name:string, color: string, idProject: string, createdAt:string, modifier: Member){
        if(!modifier.canManageCategories())throw new Unauthorized("This member cannot create categories in this project", modifier);
        const idCategory = new IdCategory(id);
        const projectId = new IdProject(idProject);
        const category = new Category(idCategory, new CategoryName(name), new CategoryColor(color as AllowedColors), projectId, DateTime.create(createdAt));
        category.addEvent(new CategoryCreated(DateTime.now(), modifier, projectId, idCategory));
        return category;
    }

    public static fromPrimitives(params:iCategoryParams){
        return new Category(new IdCategory(params.id), new CategoryName(params.name), new CategoryColor(params.color as AllowedColors), new IdProject(params.idProject), DateTime.create(params.createdAt.toISOString()));
    }
    
    public updateName(name: CategoryName, modifier: Member): void {
        if(!modifier.canManageCategories())throw new Unauthorized("This member cannot modify categories in this project", modifier);
        this.name = name;
        this.addEvent(new CategoryNameChanged(DateTime.now(), modifier, this.idProject, this.idCategory, name));
    }

    public updateColor(color: CategoryColor, modifier: Member): void{
        if(!modifier.canManageCategories())throw new Unauthorized("This member cannot modify categories in this project", modifier);
        this.color = color;
        this.addEvent(new CategoryColorChanged(DateTime.now(), modifier, this.idProject, this.idCategory, color));
    }

    public toPrimitives(): iCategoryParams {
        return {
            id: this.idCategory.getID(),
            idProject: this.idProject.getID(),
            name: this.name.getName(),
            color: this.color.getColor(),
            createdAt: this.createdAt.getDate()
        }
    }
};
