import ValueObject from "../../../shared/core/objects/ValueObject";
import MemberRoleNotValid from "../error/MemberRoleNotValid";
import { ALLOWED_MEMBER_ROLES, type AllowedMemberRoles } from "../types/AllowedMemberRoles";

export default class MemberRole extends ValueObject{
    private role!: AllowedMemberRoles;

    constructor(role: AllowedMemberRoles){
        super();
        if(!ALLOWED_MEMBER_ROLES.includes(role)) throw new MemberRoleNotValid(role);
        this.role = role;
    }

    public getRole(): AllowedMemberRoles{
        return this.role;
    }

    public canManageProject(): boolean{
        return this.role === ALLOWED_MEMBER_ROLES[0];
    }

    public canManageMembers(): boolean{
        return this.canManageProject() || this.role === ALLOWED_MEMBER_ROLES[1];
    }

    public canManageCategories(): boolean{
        return this.canManageProject() || this.role === ALLOWED_MEMBER_ROLES[1];
    }

    public canManageLists(): boolean{
        return this.canManageProject() || this.role === ALLOWED_MEMBER_ROLES[1];
    }

    public canManageTasks(): boolean{
        return this.canManageProject() || this.role === ALLOWED_MEMBER_ROLES[1] || this.role === ALLOWED_MEMBER_ROLES[2]; 
    }

    public canUpdateTasks(): boolean{
        return this.canManageProject() || this.canManageTasks() || this.role === ALLOWED_MEMBER_ROLES[3]; 
    }
};
