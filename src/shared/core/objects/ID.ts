import Text from "./Text";
import ValueObject from "./ValueObject";
import {v4 as uuidv4} from 'uuid';

export default class ID extends ValueObject{
    private id!:Text;

    constructor(id:Text){
        super();
        this.id = id; 
    }

    static generateId(): ID{
        const uuid = uuidv4();
        return new ID(new Text(uuid));
    }

    public getId(): Text{
        return this.id;
    }
};
