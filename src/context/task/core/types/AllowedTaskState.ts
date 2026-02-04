export const ALLOWED_TASK_STATE = ["completed", "pending"] as const;
export type AllowedTaskState = typeof ALLOWED_TASK_STATE[number];
