import InvalidOperation from "../../../../shared/core/errors/InvalidOperation";
import InvalidParameters from "../../../../shared/core/errors/InvalidParameters";
import Entity from "../../../../shared/core/model/Entity";
import Archived from "../../../../shared/core/objects/Archived";
import type Attachment from "../../../../shared/core/objects/Attachment";
import Contributor from "../../../../shared/core/objects/Contributor";
import DateTime from "../../../../shared/core/objects/DateTime";
import ID from "../../../../shared/core/objects/ID";
import type IntNumber from "../../../../shared/core/objects/IntNumber";
import None from "../../../../shared/core/objects/None";
import type Text from "../../../../shared/core/objects/Text";
import TaskArchived from "../events/TaskArchived";
import TaskAttachmentAdded from "../events/TaskAttachmentAdded";
import TaskAttachmentDeleted from "../events/TaskAttachmentDeleted";
import TaskBackgroundImageUpdated from "../events/TaskBackgroundImageUpdated";
import TaskCategoryAdded from "../events/TaskCategoryAdded";
import TaskCategoryDeleted from "../events/TaskCategoryDeleted";
import TaskContributorAdded from "../events/TaskContributorAdded";
import TaskContributorDeleted from "../events/TaskContributorDeleted";
import TaskDescriptionUpdated from "../events/TaskDescriptionUpdated";
import TaskDueDateUpdated from "../events/TaskDueDateUpdated";
import TaskFinished from "../events/TaskFinished";
import TaskMarkedAsPending from "../events/TaskMarkedAsPending";
import TaskMoved from "../events/TaskMoved";
import TaskMovedToPositionInList from "../events/TaskMovedToPositionInList";
import TaskPriorityUpdated from "../events/TaskPriorityUpdated";
import TaskBeginDateUpdated from "../events/TaskStartDateUpdated";
import TaskUnarchived from "../events/TaskUnarchived";
import TitleUpdated from "../events/TitleUpdated";
import AttachmentCollection from "../objects/AttachmentCollection";
import type BackGroundImage from "../objects/BackGroundImage";
import CategoryCollection from "../objects/CategoryCollection";
import Completed from "../objects/Completed";
import ContributorCollection from "../objects/ContributorCollection";
import Pending from "../objects/Pending";
import TaskCategory from "../objects/TaskCategory";
import type TaskDateTime from "../objects/TaskDateTime";
import type TaskDescription from "../objects/TaskDescription";
import type TaskList from "../objects/TaskList";
import type TaskPriority from "../objects/TaskPriority";
import type TaskTitle from "../objects/TaskTitle";

export default class Task extends Entity{
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

    private readonly id!:ID
    private readonly createdAt!:DateTime;

    constructor(
         
    ) {
        super()
    }

    public removeCategory(category: TaskCategory, modifier: Contributor): void {
        if(this.isArchived())throw new InvalidOperation('Task is archived and cannot be modified');
        this.categories = this.categories.deleteItem(category);
        this.addEvent(new TaskCategoryDeleted(DateTime.now(), modifier, category));
    }

    public removeContributor(contributor: Contributor, modifier: Contributor): void{
        if(this.isArchived())throw new InvalidOperation('Task is archived and cannot be modified');
        this.contributors = this.contributors.deleteItem(contributor);
        this.addEvent(new TaskContributorDeleted(DateTime.now(), modifier, contributor));
    }

    public deleteAttachment(attachment: Attachment, modifier: Contributor): void{
        if(this.isArchived())throw new InvalidOperation('Task is archived and cannot be modified');
        this.attachments = this.attachments.deleteItem(attachment);
        this.addEvent(new TaskAttachmentDeleted(DateTime.now(), modifier, attachment));
    }

    public moveToList(newList:TaskList, modifier: Contributor, position:IntNumber): void{
        if(this.isArchived())throw new InvalidOperation('Task is archived and cannot be modified');
        this.currentList = newList;
        const nameList:Text = this.currentList.getName()
        this.position = position;
        this.addEvent(new TaskMoved(DateTime.now(), modifier, nameList, position));
    }

    public unarchive(modifier: Contributor):void{
        this.archived = new None();
        this.addEvent(new TaskUnarchived(DateTime.now(), modifier));
    }

    public movePosition(modifier: Contributor, newPosition: IntNumber): void{
        this.position = newPosition;
        this.addEvent(new TaskMovedToPositionInList(DateTime.now(), modifier, newPosition));
    }
    
    public archive(modifier:Contributor):void{
        this.archived = new Archived();
        this.addEvent(new TaskArchived(DateTime.now(), modifier))
    }

    public addContributor(contributor:Contributor, modifier: Contributor): void{
        if(this.isArchived())throw new InvalidOperation('Task is archived and cannot be modified');
        this.contributors = this.contributors.addItem(contributor);
        this.addEvent(new TaskContributorAdded(DateTime.now(), modifier, contributor));
    }

    public addAtachment(attachment:Attachment, modifier: Contributor):void {
        if(this.isArchived())throw new InvalidOperation('Task is archived and cannot be modified');
        this.attachments = this.attachments.addItem(attachment);
        this.addEvent(new TaskAttachmentAdded(DateTime.now(), modifier, attachment));
    }

    public updatePriority(priority: TaskPriority, modifier: Contributor): void{
        if(this.isArchived())throw new InvalidOperation('Task is archived and cannot be modified');
        this.priority = priority;
        this.addEvent(new TaskPriorityUpdated(DateTime.now(), modifier, priority));
    }

    public updateStartDate(date:TaskDateTime, modifier: Contributor): void{
        if(this.isArchived())throw new InvalidOperation('Task is archived and cannot be modified');
        if(this.dueDate instanceof DateTime){
            if(!DateTime.isAfter(this.dueDate, date.getDate()))throw new InvalidParameters('The end date must be after the start date', {startDate:date, dueDate:this.dueDate});
        }
        this.startDate = date;
        this.addEvent(new TaskBeginDateUpdated(DateTime.now(), modifier, this.startDate as DateTime));
    }

    public updateDueDate(date:TaskDateTime, modifier: Contributor): void{
        if(this.isArchived())throw new InvalidOperation('Task is archived and cannot be modified');
        if(this.startDate instanceof DateTime){
            if(!DateTime.isAfter(date.getDate(), this.startDate))throw new InvalidParameters('The end date must be after the start date', {dueDate:date, startDate:this.startDate});
        }
        this.dueDate = date;
        this.addEvent(new TaskDueDateUpdated(DateTime.now(), modifier, this.dueDate as DateTime));
    }

    public updateBackGroundImage(image:BackGroundImage, modifier: Contributor): void{
        if(this.isArchived())throw new InvalidOperation('Task is archived and cannot be modified');
        this.image = image;
        this.addEvent(new TaskBackgroundImageUpdated(DateTime.now(), modifier));
    }

    public updateTitle(title: TaskTitle, modifier: Contributor): void {
        if(this.isArchived())throw new InvalidOperation('Task is archived and cannot be modified');
        this.title = title;
        this.addEvent(new TitleUpdated(DateTime.now(), modifier, this.title.getTitle()));
    }

    public updateDescription(description: TaskDescription, modifier: Contributor): void {
        if(this.isArchived())throw new InvalidOperation('Task is archived and cannot be modified');
        this.description = description;
        const descriptionText = description.getDescription();
        this.addEvent(new TaskDescriptionUpdated(DateTime.now(), modifier, descriptionText));
    }

    public addCategory(category: TaskCategory, modifier: Contributor): void {
        if(this.isArchived())throw new InvalidOperation('Task is archived and cannot be modified');
        this.categories = this.categories.addItem(category);
        this.addEvent(new TaskCategoryAdded(DateTime.now(), modifier, category));
    }

    public markAsFinished(completed:Completed): void {
        if(this.isArchived())throw new InvalidOperation('Task is archived and cannot be modified');
        if(this.state instanceof Completed) return;
        this.state = completed;
        this.addEvent(new TaskFinished(this.state.getCompletedDate(), this.state.getContributor()));
    }

    public markAsPending(pending: Pending): void {
        if(this.isArchived())throw new InvalidOperation('Task is archived and cannot be modified');
        if(this.state instanceof Pending)return;
        this.state = pending;
        this.addEvent(new TaskMarkedAsPending(this.state.getCompletedDate() as DateTime, this.state.getContributor() as Contributor));
    }

    public getTitle(): Text {
        return this.title.getTitle();
    }

    public getDescription(): Text | None{
        return this.description;
    }

    public getPriority(): TaskPriority{
        return this.priority;
    }

    public getImageUrl(): Attachment | None{
       return this.image
    }

    public getState(): Completed | Pending {
        return this.state;
    }

    public getCategories(): CategoryCollection {
        return this.categories; 
    }

    public getStartDate(): DateTime | None{
        return this.startDate;
    }

    public getPosition(): IntNumber{
        return this.position;
    }

    public getdueDate(): DateTime | None{
        return this.dueDate;
    }

    public getIdList(): TaskList{
        return this.currentList;
    }

    public getId(): ID{
        return this.id;
    }

    public getContributors(): ContributorCollection{
        return this.contributors;
    }

    public getAttachments(): AttachmentCollection{
        return this.attachments;
    }

    public getCreationDate():DateTime{
        return this.createdAt;
    }

    public isArchived(): boolean{
        if(this.archived instanceof Archived)return true;
        return false;
    }
};
