export const ALLOWED_MEMBER_STATUS = ['blocked', 'active', 'deleted'] as const;
export type AllowedMemberStatus = typeof ALLOWED_MEMBER_STATUS[number];
