export const PRIORITY_LEVEL = [
  'NO_PRIORITY',
  'LOW',
  'MEDIUM',
  'HIGH',
] as const;

export enum Priority {
  noPriority = 'NO_PRIORITY',
  low = 'LOW',
  medium = 'MEDIUM',
  high = 'HIGH',
}
