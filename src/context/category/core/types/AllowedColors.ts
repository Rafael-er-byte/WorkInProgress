export const ALLOWED_COLORS = ['red', 'blue', 'green', 'lightGreen', 'yellow', 'rose', 'skyBlue', 'black', 'orange', 'purple', 'none'] as const; 
export type AllowedColors = typeof ALLOWED_COLORS[number];
