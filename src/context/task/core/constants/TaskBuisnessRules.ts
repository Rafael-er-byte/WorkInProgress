export default class TaskBusinessRules {
    private static readonly TITLE_LIMIT_SIZE: number = 100;
    private static readonly DESCRIPTION_LIMIT_SIZE: number = 400;
    private static readonly MAX_CATEGORIES: number = 6;
    private static readonly MAX_NOTES: number = 25;
    private static readonly MAX_ATTACHMENTS: number = 5;
    private static readonly MAX_CONTRIBUTORS: number = 20;

    public static titleLimit(): number {
        return this.TITLE_LIMIT_SIZE;
    }

    public static descriptionLimit(): number {
        return this.DESCRIPTION_LIMIT_SIZE;
    }

    public static maxCategories(): number {
        return this.MAX_CATEGORIES;
    }

    public static maxNotes(): number {
        return this.MAX_NOTES;
    }

    public static maxAttachments(): number {
        return this.MAX_ATTACHMENTS;
    }

    public static maxContributors(): number {
        return this.MAX_CONTRIBUTORS;
    }
};
