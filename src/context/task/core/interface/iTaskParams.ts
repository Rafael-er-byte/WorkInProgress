import type Category from "../../../category/core/model/Category";
import type Member from "../../../member/core/model/Member";
import type Attachment from "../../../shared/core/objects/Attachment";
import type Note from "../objects/Note";
import type TaskPosition from "../objects/TaskPosition";

export default interface iTaskParams{
    title: string;
    priority: string;
    position: TaskPosition;
    state: string;
    archived: boolean;
    id: string;
    idProject:string;
    createdAt: Date | string;
    
    notesQuantity?:number;
    description?: string | undefined;
    image?: Attachment | undefined;
    startDate?: Date | string | undefined;
    dueDate?: Date | string | undefined;

    categories: Category[],
    attachments: Attachment[],
    members: Member[],
    notes: Note[]
};
