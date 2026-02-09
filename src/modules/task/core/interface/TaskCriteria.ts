import type { AllowedTaskState } from "../types/AllowedTaskState";
import type { Priority } from "../types/Priority";

export default interface TaskCriteria{
    limit: number;
    page: number;
    nameLike: string;
    categoryName: string;
    status: AllowedTaskState;
    member: string;
    priority: Priority;
    DateRange: {
        type: 'DueDate' | 'StartDate',
        start: Date,
        end: Date
    };
};
