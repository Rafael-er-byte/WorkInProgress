import ID from "./ID";

export default class IdEntity{
    private id!:ID;
    
    constructor(id:string){
        this.id = new ID(id);
    }

    public getID():string{
        return this.id.getId();
    }
};
