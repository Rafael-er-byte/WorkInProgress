export const ALLOWED_ATTACHMENTS = ['image', 'pdf', 'doc', 'spreadsheet', 'video', 'lilnk'] as const;
export type AllowedAttachents = typeof ALLOWED_ATTACHMENTS[number];
