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
import CategoryStatus from "../objects/CategoryStatus";
import type { AllowedCategoryStatus } from "../types/AllowedCategoryStatus";

export default class Category extends Entity{
    private name!: CategoryName;
    private color!: CategoryColor;
    private isActive!: CategoryStatus;
    private readonly idCategory!: IdCategory;
    private readonly idProject!: IdProject;

    private constructor(idCategory: IdCategory, name: CategoryName, color: CategoryColor, idProject: IdProject, isActive: CategoryStatus) {
        super();

        this.name = name;
        this.color = color;
        this.idCategory = idCategory;
        this.idProject = idProject;
        this.isActive = isActive;
    }

    public static create(id: string, name:string, color: string, idProject: string, isActive: AllowedCategoryStatus, modifier: Member){
        const idCategory = new IdCategory(id);
        const projectId = new IdProject(idProject);
        const category = new Category(
            idCategory, 
            new CategoryName(name), 
            new CategoryColor(color as AllowedColors), 
            projectId, 
            CategoryStatus.create(isActive));
        category.addEvent(new CategoryCreated(DateTime.now(), modifier, projectId, idCategory));
        return category;
    }

    public static fromPrimitives(params:iCategoryParams){
        return new Category(
            new IdCategory(params.id), 
            new CategoryName(params.name), 
            new CategoryColor(params.color as AllowedColors), 
            new IdProject(params.idProject), 
            CategoryStatus.create(params.isActive));
    }
    
    public updateName(name: CategoryName, modifier: Member): void {
        this.name = name;
        this.addEvent(new CategoryNameChanged(DateTime.now(), modifier, this.idProject, this.idCategory, name));
    }

    public updateColor(color: CategoryColor, modifier: Member): void{
        this.color = color;
        this.addEvent(new CategoryColorChanged(DateTime.now(), modifier, this.idProject, this.idCategory, color));
    }

    public getId(): string{
        return this.idCategory.getID();
    }

    public exists(): boolean{
        return this.isActive.exists();
    }

    public toPrimitives(): iCategoryParams {
        return {
            id: this.idCategory.getID(),
            idProject: this.idProject.getID(),
            name: this.name.getName(),
            color: this.color.getColor(),
            isActive: this.isActive.getStatus()
        }
    }
};
