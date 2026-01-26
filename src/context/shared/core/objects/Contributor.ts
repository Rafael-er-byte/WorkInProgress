import { ALLOWED_USER_STATUS, type AllowedUserStatus } from "../types/AllowedUserStatus.type";
import type ID from "./ID";
import type Text from "./Text";
import ValueObject from "./ValueObject";

export default class Contributor extends ValueObject{
    private id!: ID;
    private userName!: Text;
    private status!: AllowedUserStatus;

    constructor(id:ID, userName:Text, status: AllowedUserStatus){
        super();
        this.id = id;
        this.userName = userName;
        this.status = status;
    }

    public isActive(): boolean{
        if(this.status === ALLOWED_USER_STATUS[0])return true;
        return false;
    }

    public getId():ID{
        return this.id;
    }

    public getUserName(): Text{
        return this.userName;
    }
};
