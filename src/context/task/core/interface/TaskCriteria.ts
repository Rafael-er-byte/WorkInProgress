import type { AllowedTaskState } from "../types/AllowedTaskState";

export default interface TaskCriteria{
    limit: number;
    page: number;
    nameLike: string;
    categoryName: string;
    status: AllowedTaskState;
    member: string;
    DateRange: {
        type: 'DueDate' | 'StartDate',
        start: Date,
        end: Date
    };
};
