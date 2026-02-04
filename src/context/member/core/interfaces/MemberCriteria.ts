import type { AllowedMemberRoles } from "../../../member/core/types/AllowedMemberRoles";
import type { AllowedMemberStatus } from "../../../member/core/types/AllowedMemberStatus";

export default interface MemberCriteria {
    limit: number;
    page: number;
    nameLike: string;
    status: AllowedMemberStatus | 'All';
    role: AllowedMemberRoles | 'All';
};
