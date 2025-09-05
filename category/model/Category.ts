export default class Category{
    private idCategory!:string;
    private name!:string; 
    private idCreator!:string;
    private createdAt?: string | undefined;
    constructor(name:string, idCreator:string, idCategory:string, createdAt?:string | undefined){
        if(name.trim().length === 0 || !name) throw new Error('Invalid name of category');
        if(idCreator.trim().length === 0 || !idCreator) throw new Error('Invalid user id');
        if(idCategory.trim().length === 0 || !idCategory) throw new Error('Invalid id');
        this.idCategory = idCategory;
        this.name = name;
        this.idCreator = idCreator;
        this.createdAt = createdAt;
    }
};