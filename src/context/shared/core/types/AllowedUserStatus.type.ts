export const ALLOWED_USER_STATUS = ['Active', 'Blocked'] as const;
export type AllowedUserStatus = typeof ALLOWED_USER_STATUS[number];
