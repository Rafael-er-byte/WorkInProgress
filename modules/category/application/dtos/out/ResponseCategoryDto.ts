
export default class ResponseCategoryDto{
    name!:string;
    idCreator!:string;
    idCategory!:string;

    constructor(name:string, idCreator:string, idCategory:string){
        this.name = name;
        this.idCategory = idCategory;
        this.idCreator = idCreator;
    }
};
