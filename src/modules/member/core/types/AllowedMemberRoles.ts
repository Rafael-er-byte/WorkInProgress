export const ALLOWED_MEMBER_ROLES = [
  'OWNER',
  'MANAGER',
  'COLABORATOR',
  'CONTRIBUTOR',
  'AUDITOR',
] as const;

export enum AllowedMemberRoles {
  owner = 'OWNER',
  manager = 'MANAGER',
  colaborator = 'COLABORATOR',
  contributor = 'CONTRIBUTOR',
  auditor = 'AUDITOR',
}
