export default class Category{
    private name!:string; 
    private idCreator!:string;
    private createdAt?: string | undefined;
    constructor(name:string, idCreator:string, createdAt?:string | undefined){
        if(name.trim().length === 0 || !name) throw new Error('Invalid name of category');
        if(idCreator.trim().length === 0 || !idCreator) throw new Error('The user doesnt exists');
        this.name = name;
        this.idCreator = idCreator;
        this.createdAt = createdAt;
    }
};