export const ALLOWED_MEMBER_ROLES = ['owner', 'administrator', 'colaborator', 'contributor', 'auditor'] as const;
export type AllowedMemberRoles = typeof ALLOWED_MEMBER_ROLES[number];
