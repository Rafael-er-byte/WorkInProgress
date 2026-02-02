export default class TaskRules {
    private static readonly TITLE_LIMIT_SIZE: number = 200;
    private static readonly DESCRIPTION_LIMIT_SIZE: number = 800;
    private static readonly MAX_CATEGORIES: number = 10;
    private static readonly MAX_ATTACHMENTS: number = 50;
    private static readonly MAX_MEMBERS: number = 200;
    private static readonly ATTACHMENT_LIMIT_MB_SIZE: number = 250;
    private static readonly MAX_NOTES_LIMIT: number = 150;

    public static titleLimit(): number {
        return this.TITLE_LIMIT_SIZE;
    }

    public static descriptionLimit(): number {
        return this.DESCRIPTION_LIMIT_SIZE;
    }

    public static maxCategories(): number {
        return this.MAX_CATEGORIES;
    }

    public static maxAttachments(): number {
        return this.MAX_ATTACHMENTS;
    }

    public static maxMembers(): number {
        return this.MAX_MEMBERS;
    }

    public static getMaxMBLimitAttachmentSize(): number{
        return this.ATTACHMENT_LIMIT_MB_SIZE;
    }

    public static maxNotes(): number{
        return this.MAX_NOTES_LIMIT;
    }
};
