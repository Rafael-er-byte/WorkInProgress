import type Attachment from "../../../shared/core/objects/Attachment";
import type Contributor from "../../../shared/core/objects/Contributor";
import type TaskCategory from "../objects/TaskCategory";
import type TaskPosition from "../objects/TaskPosition";

export default interface iTaskParams{
    title: string;
    priority: string;
    position: TaskPosition;
    state: string;
    archived: boolean;
    id: string;
    createdAt: string;
    
    notesQuantity?:number;
    description?: string | undefined;
    image?: Attachment | undefined;
    startDate?: string | undefined;
    dueDate?: string | undefined;

    categories: TaskCategory[],
    attachments: Attachment[],
    contributors: Contributor[]
};
