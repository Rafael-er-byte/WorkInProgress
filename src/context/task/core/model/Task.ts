import InvalidParameters from "../../../shared/core/errors/InvalidParameters";
import Entity from "../../../shared/core/model/Entity";
import Archived from "../../../shared/core/objects/Archived";
import type Attachment from "../../../shared/core/objects/Attachment";
import DateTime from "../../../shared/core/objects/DateTime";
import None from "../../../shared/core/objects/None";
import TaskArchived from "../events/TaskArchived";
import TaskAttachmentAdded from "../events/TaskAttachmentAdded";
import TaskAttachmentDeleted from "../events/TaskAttachmentDeleted";
import TaskBackgroundImageUpdated from "../events/TaskBackgroundImageUpdated";
import TaskDescriptionUpdated from "../events/TaskDescriptionUpdated";
import TaskDueDateUpdated from "../events/TaskDueDateUpdated";
import TaskFinished from "../events/TaskFinished";
import TaskMarkedAsPending from "../events/TaskMarkedAsPending";
import TaskMoved from "../events/TaskMoved";
import TaskPriorityUpdated from "../events/TaskPriorityUpdated";
import TaskBeginDateUpdated from "../events/TaskStartDateUpdated";
import TaskUnarchived from "../events/TaskUnarchived";
import TitleUpdated from "../events/TitleUpdated";
import AttachmentCollection from "../objects/AttachmentCollection";
import BackGroundImage from "../objects/BackGroundImage";
import CategoryCollection from "../objects/CategoryCollection";
import TaskDateTime from "../objects/TaskDateTime";
import TaskDescription from "../objects/TaskDescription";
import TaskId from "../objects/TaskId";
import TaskPosition from "../objects/TaskPosition";
import TaskPriority from "../objects/TaskPriority";
import TaskTitle from "../objects/TaskTitle";
import type iTaskParams from "../interface/iTaskParams";
import TaskCreated from "../events/TaskCreated";
import TaskState from "../objects/TaskState";
import { ALLOWED_TASK_STATE, type AllowedTaskState } from "../types/AllowedTaskState";
import TaskDeleted from "../events/TaskDeleted";
import CannotModifyArchivedTasks from "../error/CannotModifyArchivedTasks";
import TaskNeedsToBeArchivedBeforeDeleteIt from "../error/TaskNeedsToBeArchivedBeforeDeleteIt";
import InvalidStartDate from "../error/InvalidStartDateTime";
import InvalidDueDate from "../error/InvalidDueDateTime";
import MemberCollection from "../objects/MemberCollection";
import NoteCollection from "../objects/NoteCollection";
import type Note from "../objects/Note";
import type Member from "../../../member/core/model/Member";
import type Category from "../../../category/core/model/Category";
import TaskCategoryAdded from "../events/TaskCategoryAdded";
import TaskCategoryDeleted from "../events/TaskCategoryDeleted";
import TaskContributorDeleted from "../events/TaskMemberDeleted";
import TaskMemberAdded from "../events/TaskMemberAdded";
import IdProject from "../../../project/core/objects/IdProject";
import TaskNoteAdded from "../events/TaskNoteAdded";
import type { Priority } from "../types/Priority";

export default class Task extends Entity {
    private title!: TaskTitle;
    private priority!: TaskPriority;
    private position!: TaskPosition;
    private state!: TaskState;
    private archived!: Archived | None;

    private description: TaskDescription | None = new None();
    private image: BackGroundImage | None = new None();
    private startDate: DateTime | None = new None();
    private dueDate: DateTime | None = new None();

    private categories: CategoryCollection = new CategoryCollection();
    private members: MemberCollection = new MemberCollection();
    private attachments: AttachmentCollection = new AttachmentCollection();
    private notes: NoteCollection = new NoteCollection();
    private exists!: boolean;

    private readonly id!: TaskId;
    private readonly idProject!: IdProject;
    private readonly createdAt!: DateTime;

    public constructor(params: iTaskParams) {
        super();
        this.title = new TaskTitle(params.title);
        this.id = new TaskId(params.id);
        this.idProject = new IdProject(params.idProject);
        this.createdAt = DateTime.create(params.createdAt as string);
        this.priority = new TaskPriority(params.priority as Priority);

        if (!(params.position instanceof TaskPosition)) {
            throw new InvalidParameters("The position of the task is not valid", params.position);
        }

        this.position = params.position;
        this.state = TaskState.create(params.state as AllowedTaskState);
        this.archived = params.archived === true ? new Archived() : new None();

        if (params.description) this.description = new TaskDescription(params.description);
        if (params.image) this.image = new BackGroundImage(params.image);
        if (params.startDate) this.startDate = DateTime.create(params.startDate as string);
        if (params.dueDate) this.dueDate = DateTime.create(params.dueDate as string);

        this.categories = new CategoryCollection(params.categories);
        this.attachments = new AttachmentCollection(params.attachments);
        this.members = new MemberCollection(params.members);
        this.notes = new NoteCollection(params.notes);
        this.exists = params.exists;
    }

    public static create(params: iTaskParams, member: Member): Task {
        const task = new Task(params);
        task.addEvent(
            new TaskCreated(DateTime.now(), member, task.getIdProject(), task.getID(), params)
        );
        return task;
    }

    public delete(member: Member): void {
        if (!this.isArchived()) {
            throw new TaskNeedsToBeArchivedBeforeDeleteIt(this.id);
        }
        this.addEvent(
            new TaskDeleted(DateTime.now(), member, this.idProject, this.id)
        );

        this.exists = false;
    }

    public static fromPrimitives(params: iTaskParams): Task {
        return new Task(params);
    }

    public removeCategory(category: Category, modifier: Member): void {
        if (this.isArchived()) throw new CannotModifyArchivedTasks(this.id);
        this.categories = this.categories.deleteItem(category);
        this.addEvent(
            new TaskCategoryDeleted(DateTime.now(), modifier, this.idProject, this.id, category)
        );
    }

    public removeMember(modifier: Member, member: Member): void {
        if (this.isArchived()) throw new CannotModifyArchivedTasks(this.id);
        this.members = this.members.deleteItem(member);
        this.addEvent(
            new TaskContributorDeleted(DateTime.now(), modifier, this.idProject, this.id, member)
        );
    }

    public deleteAttachment(attachment: Attachment, modifier: Member): void {
        if (this.isArchived()) throw new CannotModifyArchivedTasks(this.id);
        this.attachments = this.attachments.deleteItem(attachment);
        this.addEvent(
            new TaskAttachmentDeleted(DateTime.now(), modifier, this.idProject, this.id, attachment)
        );
    }

    public move(list: TaskPosition, modifier: Member): void {
        if (this.isArchived()) throw new CannotModifyArchivedTasks(this.id);
        this.position = list;
        this.addEvent(
            new TaskMoved(DateTime.now(), modifier, this.idProject, this.id, this.position)
        );
    }

    public unarchive(modifier: Member): void {
        this.archived = new None();
        this.addEvent(
            new TaskUnarchived(DateTime.now(), modifier, this.idProject, this.id)
        );
    }

    public archive(modifier: Member): void {
        this.archived = new Archived();
        this.addEvent(
            new TaskArchived(DateTime.now(), modifier, this.idProject, this.id)
        );
    }

    public addMember(modifier: Member, member: Member): void {
        if (this.isArchived()) throw new CannotModifyArchivedTasks(this.id);
        this.members = this.members.addItem(member);
        this.addEvent(
            new TaskMemberAdded(DateTime.now(), modifier, this.idProject, this.id, member)
        );
    }

    public addAtachment(attachment: Attachment, modifier: Member): void {
        if (this.isArchived()) throw new CannotModifyArchivedTasks(this.id);
        this.attachments = this.attachments.addItem(attachment);
        this.addEvent(
            new TaskAttachmentAdded(DateTime.now(), modifier, this.idProject, this.id, attachment)
        );
    }

    public updatePriority(priority: TaskPriority, modifier: Member): void {
        if (this.isArchived()) throw new CannotModifyArchivedTasks(this.id);
        this.priority = priority;
        this.addEvent(
            new TaskPriorityUpdated(DateTime.now(), modifier, this.idProject, this.id, priority)
        );
    }

    public updateStartDate(date: TaskDateTime, modifier: Member): void {
        if (this.isArchived()) throw new CannotModifyArchivedTasks(this.id);
        if (this.dueDate instanceof DateTime) {
            if (!DateTime.isAfter(this.dueDate, date.getDate())) {
                throw new InvalidStartDate({ startDate: date, dueDate: this.dueDate });
            }
        }
        this.startDate = date;
        this.addEvent(
            new TaskBeginDateUpdated(DateTime.now(), modifier, this.idProject, this.id, this.startDate as DateTime)
        );
    }

    public updateDueDate(date: TaskDateTime, modifier: Member): void {
        if (this.isArchived()) throw new CannotModifyArchivedTasks(this.id);
        if (this.startDate instanceof DateTime) {
            if (!DateTime.isAfter(date.getDate(), this.startDate)) {
                throw new InvalidDueDate({ dueDate: date, startDate: this.startDate });
            }
        }
        this.dueDate = date;
        this.addEvent(
            new TaskDueDateUpdated(DateTime.now(), modifier, this.idProject, this.id, this.dueDate as DateTime)
        );
    }

    public updateBackGroundImage(image: BackGroundImage, modifier: Member): void {
        if (this.isArchived()) throw new CannotModifyArchivedTasks(this.id);
        this.image = image;
        this.addEvent(
            new TaskBackgroundImageUpdated(DateTime.now(), modifier, this.idProject, this.id)
        );
    }

    public updateTitle(title: TaskTitle, modifier: Member): void {
        if (this.isArchived()) throw new CannotModifyArchivedTasks(this.id);
        this.title = title;
        this.addEvent(
            new TitleUpdated(DateTime.now(), modifier, this.idProject, this.id, this.title.getTitle())
        );
    }

    public updateDescription(description: TaskDescription, modifier: Member): void {
        if (this.isArchived()) throw new CannotModifyArchivedTasks(this.id);
        this.description = description;
        const descriptionText = description.getDescription();
        this.addEvent(
            new TaskDescriptionUpdated(DateTime.now(), modifier, this.idProject, this.id, descriptionText)
        );
    }

    public addCategory(category: Category, modifier: Member): void {
        if (this.isArchived()) throw new CannotModifyArchivedTasks(this.id);
        this.categories = this.categories.addItem(category);
        this.addEvent(
            new TaskCategoryAdded(DateTime.now(), modifier, this.idProject, this.id, category)
        );
    }

    public markAsFinished(member: Member): void {
        if (this.isArchived()) throw new CannotModifyArchivedTasks(this.id);
        if (this.state.isCompleted()) return;
        this.state = TaskState.completed();
        this.addEvent(
            new TaskFinished(DateTime.now(), member, this.idProject, this.id)
        );
    }

    public markAsPending(member: Member): void {
        if (this.isArchived()) throw new CannotModifyArchivedTasks(this.id);
        if (!this.state.isCompleted()) return;
        this.state = TaskState.pending();
        this.addEvent(
            new TaskMarkedAsPending(DateTime.now(), member, this.idProject, this.id)
        );
    }

    public addNote(note: Note, modifier: Member): void {
        if (this.isArchived()) throw new CannotModifyArchivedTasks(this.id);
        this.notes.addItem(note);
         this.addEvent(
            new TaskNoteAdded(DateTime.now(), modifier, this.idProject, this.id, note)
        );
    }

    protected isArchived(): boolean {
        return this.archived instanceof Archived;
    }

    protected isCompleted(): boolean {
        return this.state.isCompleted();
    }

    public overDue(): boolean {
        if (this.dueDate instanceof DateTime && DateTime.isAfter(this.dueDate, DateTime.now())) {
            return false;
        }
        return true;
    }

    public getID(): TaskId {
        return this.id;
    }

    public getIdProject(): IdProject {
        return this.idProject;
    }

    public taskExists(): boolean{
        return this.exists;
    }

    public toPrimitives(): iTaskParams {
        const archivedTask = this.archived instanceof Archived;
        const descriptionTask = this.description instanceof TaskDescription ? this.description.getDescription() : undefined;
        const imageTask = this.image instanceof BackGroundImage ? this.image.getImage() : undefined;
        const startDate = this.startDate instanceof TaskDateTime ? this.startDate.getDate().getDate() : undefined;
        const dueDate = this.dueDate instanceof TaskDateTime ? this.dueDate.getDate().getDate() : undefined;
        const state = this.state.isCompleted() ? ALLOWED_TASK_STATE[0] : ALLOWED_TASK_STATE[1];

        return {
            title: this.title.getTitle(),
            priority: this.priority.getPriority(),
            position: this.position,
            state,
            archived: archivedTask,
            notesQuantity: this.notes.size(),
            description: descriptionTask,
            image: imageTask,
            startDate,
            dueDate,
            categories: this.categories.primitiveCollection(),
            members: this.members.primitiveCollection(),
            attachments: this.attachments.primitiveCollection(),
            notes: this.notes.primitiveCollection(),
            id: this.id.getID(),
            idProject: this.idProject.getID(),
            createdAt: this.createdAt.getDate(),
            exists: this.exists
        };
    }
}
