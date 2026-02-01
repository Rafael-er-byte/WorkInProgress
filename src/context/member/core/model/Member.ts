import type IdMember from "../objects/IdMember";
import type idProject from "../../../project/core/objects/IdProject";
import type MemberStatus from "../objects/MemberStatus";
import type MemberRole from "../objects/MemberRole";
import Entity from "../../../shared/core/model/Entity";
import type Account from "../../../account/core/model/Account";

export default class Member extends Entity{
    private id!:IdMember;
    private idProject!: idProject;
    private status!: MemberStatus; 
    private role!:MemberRole;
    private userAcount!: Account

    private constructor(id: IdMember, idProject: idProject, status: MemberStatus, role: MemberRole, account:Account){
        super();
        this.id = id;
        this.idProject = idProject;
        this.status = status;
        this.role = role;
        this.userAcount = account;
    }

    

};
