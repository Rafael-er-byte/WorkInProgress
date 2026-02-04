import type { AllowedCategoryStatus } from "../types/AllowedCategoryStatus";

export default interface iCategoryParams{
    id: string;
    idProject: string;
    name: string;
    color: string;
    isActive: AllowedCategoryStatus
};
