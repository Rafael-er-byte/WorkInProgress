export default class TaskBusinessRules {
    private static readonly TITLE_LIMIT_SIZE: number = 200;
    private static readonly DESCRIPTION_LIMIT_SIZE: number = 800;
    private static readonly MAX_CATEGORIES: number = 10;
    private static readonly MAX_ATTACHMENTS: number = 50;
    private static readonly MAX_CONTRIBUTORS: number = 200;
    private static readonly ATTACHMENT_LIMIT_MB_SIZE: number = 250;

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

    public static maxContributors(): number {
        return this.MAX_CONTRIBUTORS;
    }

    public static getMaxMBLimitAttachmentSize(): number{
        return this.ATTACHMENT_LIMIT_MB_SIZE;
    }
};
