export default class TaskBuilder{
    private title!: TaskTitle;
    private priority!: TaskPriority;
    private currentList!:TaskList;
    private state!: Completed | Pending;
    private archived!: Archived | None;
    private position!: IntNumber

    private description: TaskDescription | None = new None();
    private image: BackGroundImage | None = new None();
    private startDate: DateTime | None = new None();
    private dueDate: DateTime | None = new None();

    private categories: CategoryCollection = new CategoryCollection();
    private contributors: ContributorCollection = new ContributorCollection();
    private attachments: AttachmentCollection = new AttachmentCollection();

    private readonly id!:TaskId;
    private readonly createdAt!:DateTime;
    

};
