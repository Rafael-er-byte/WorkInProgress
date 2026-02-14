import type MemberInfo from '../objects/MemberInfo';
import type { AllowedMemberRoles } from '../types/AllowedMemberRoles';
import type { AllowedMemberStatus } from '../types/AllowedMemberStatus';

export default interface iMemberParams {
  id: string;
  idProject: string;
  status: AllowedMemberStatus;
  role: AllowedMemberRoles;
  memberInfo: MemberInfo;
}
