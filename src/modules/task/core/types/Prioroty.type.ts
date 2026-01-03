export const PRIORITY_LEVEL = ['no-priority', 'low', 'medium', 'high'] as const;
export type Priority = typeof PRIORITY_LEVEL[number];