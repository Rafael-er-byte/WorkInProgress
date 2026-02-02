export const ALLOWED_MEMBER_ROLES = ['owner', 'manager', 'colaborator', 'contributor', 'auditor'] as const;
export type AllowedMemberRoles = typeof ALLOWED_MEMBER_ROLES[number];
