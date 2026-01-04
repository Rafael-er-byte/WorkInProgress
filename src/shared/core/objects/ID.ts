import type Text from "./Text";

export default class ID{
    private id!:Text;

    constructor(id:Text){
        this.id = id; 
    }

    public getId(): Text{
        return this.id;
    }
};
