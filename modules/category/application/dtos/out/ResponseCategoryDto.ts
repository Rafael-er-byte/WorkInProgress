
export default class ResponseCategoryDto{
    name!:string;
    idCreator!:string;
    idCategory!:string;
    readonly createdAt!:string;

    constructor(name:string, idCategory:string, idCreator:string, createdAt:string){
        this.name = name;
        this.idCategory = idCategory;
        this.idCreator = idCreator;
        this.createdAt = createdAt;
    }
};
