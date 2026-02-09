import type MemberInfo from "../objects/MemberInfo";

export default interface iMemberParams{
    id:string;
    idProject: string;
    status: string; 
    role:string;
    memberInfo: MemberInfo;
};
