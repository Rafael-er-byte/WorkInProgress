import type Account from "../../../account/core/model/Account";
import type idProject from "../../../project/core/objects/IdProject";

export default interface iMemberParams{
    id:string;
    idProject: idProject;
    status: string; 
    role:string;
    account: Account;
};
