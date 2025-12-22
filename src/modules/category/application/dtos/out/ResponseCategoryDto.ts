
export default class ResponseCategoryDto{
    name!:string;
    idCategory!:string;
    icon?:string | undefined;
    readonly createdAt!:string;

    constructor(name:string, idCategory:string, createdAt:string, icon: string | undefined){
        this.name = name;
        this.idCategory = idCategory;
        this.createdAt = createdAt;
        this.icon = icon;
    }
};
