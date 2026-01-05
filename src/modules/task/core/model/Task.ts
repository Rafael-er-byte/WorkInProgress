import InvalidOperation from "../../../../shared/core/errors/InvalidOperation";
import InvalidParameters from "../../../../shared/core/errors/InvalidParameters";
import MissingRequiredParameters from "../../../../shared/core/errors/MissingRequiredParameters";
import Contributor from "../../../../shared/core/objects/Contributor";
import DateTime from "../../../../shared/core/objects/DateTime";
import ID from "../../../../shared/core/objects/ID";
import None from "../../../../shared/core/objects/None";
import type Text from "../../../../shared/core/objects/Text";
import Url from "../../../../shared/core/objects/URL";
import AttachmentAdded from "../Events/AttachmentAdded";
import AttachmentDeleted from "../Events/AttachmentDeleted";
import BackgroundImageUpdated from "../Events/BackgroundImageUpdated";
import BeginDateUpdated from "../Events/BeginDateUpdated";
import CategoryAdded from "../Events/CategoryAdded";
import CategoryDeleted from "../Events/CategoryDeleted";
import ContributorAdded from "../Events/ContributorAdded";
import ContributorDeleted from "../Events/ContributorDeleted";
import DescriptionUpdated from "../Events/DescriptionUpdated";
import EndDateUpdated from "../Events/EndDateUpdated";
import PriorityUpdated from "../Events/PriorityUpdated";
import TaskEvent from "../Events/TaskEvent";
import TaskFinished from "../Events/TaskFinished";
import TaskMarkedAsPending from "../Events/TaskMarkedAsPending";
import TaskMoved from "../Events/TaskMoved";
import TitleUpdated from "../Events/TitleUpdated";
import Completed from "../objects/Completed";
import Pending from "../objects/Pending";
import TaskCategory from "../objects/TaskCategory";
import type TaskList from "../objects/TaskList";
import type TaskNote from "../objects/TaskNote";
import type TaskPriority from "../objects/TaskPriority";

export default class Task {
    private title!: Text;
    private priority!: TaskPriority;
    private belongsTo!:TaskList;
    private lastUpdate!:DateTime;
     private state!: Completed | Pending;

    private description: Text | None = new None();
    private urlImage: Url | None = new None();
    private startDate: DateTime | None = new None();
    private endDate: DateTime | None = new None();

    private categories: TaskCategory[] = [];
    private contributors: Contributor[] = [];
    private history: TaskEvent[] = [];
    private attachments: Url[] = [];
    private notes: TaskNote[] = [];

    private readonly id!:ID
    private readonly createdAt!:DateTime;

    constructor(
         
    ) {
    }

    private updateHistory(event:TaskEvent): void{
        this.history.push(event);
        this.lastUpdate = event.getDate();
    }

    public removeCategory(category: TaskCategory, modifier: Contributor, updateTime: DateTime): void {
        this.categories = this.categories.filter(c => c.getId() !== category.getId());
        this.updateHistory(new CategoryDeleted(updateTime, modifier, category));
    }

    public deleteContributor(contributor: Contributor, modifier: Contributor, updateTime: DateTime){
        this.contributors = this.contributors.filter(c => c.getId() !== contributor.getId());
        this.updateHistory(new ContributorDeleted(updateTime, modifier, contributor));
    }

    public deleteAttachment(attachment: Url, modifier: Contributor, updateTime: DateTime): void{
        if(this.attachments.length === 0)return;
        this.attachments = this.attachments.filter(attach => attach.getUrl() !== attachment.getUrl());
        this.updateHistory(new AttachmentDeleted(updateTime, modifier, attachment));
    }

    public moveToList(newList:TaskList, modifier: Contributor, updateTime: DateTime): void{
        this.belongsTo = newList;
        const nameList:Text = this.belongsTo.getName()
        this.updateHistory(new TaskMoved(updateTime, modifier, nameList));
    }

    public addContributor(contributor:Contributor, modifier: Contributor, updateTime: DateTime): void{
        if(contributor.getId().trim().length === 0)throw new MissingRequiredParameters('Contributor id');
        this.contributors.push(contributor);
        this.updateHistory(new ContributorAdded(updateTime, modifier, contributor));
    }

    public addAtachment(attachment:Url, modifier: Contributor, updateTime: DateTime):void {
        this.attachments.push(attachment);
        this.updateHistory(new AttachmentAdded(updateTime, modifier, attachment));
    }

    public setPriority(priority: TaskPriority, modifier: Contributor, updateTime: DateTime): void{
        this.priority = priority;
        this.updateHistory(new PriorityUpdated(updateTime, modifier, priority));
    }

    public setBeginDate(date:DateTime, modifier: Contributor, updateTime: DateTime): void{
        if(!DateTime.isAfter(date, updateTime))throw new InvalidParameters('The start date must be in future', date);
        if(this.endDate instanceof DateTime){
            if(!DateTime.isAfter(this.endDate, date))throw new InvalidParameters('The end date must be after the start date', {startDate:date, endDate:this.endDate});
        }
        this.startDate = date;
        this.updateHistory(new BeginDateUpdated(updateTime, modifier, this.startDate as DateTime));
    }

    public setEndDate(date:DateTime, modifier: Contributor, updateTime: DateTime): void{
        if(!DateTime.isAfter(date, updateTime))throw new InvalidParameters('The end date must be in future', date);
        if(this.startDate instanceof DateTime){
            if(!DateTime.isAfter(date, this.startDate))throw new InvalidParameters('The end date must be after the start date', {endDate:date, startDate:this.startDate});
        }
        this.endDate = date;
        this.updateHistory(new EndDateUpdated(updateTime, modifier, this.endDate as DateTime));
    }

    public setUrlImage(url:Url, modifier: Contributor, updateTime: DateTime): void{
        this.urlImage = url;
        this.updateHistory(new BackgroundImageUpdated(updateTime, modifier));
    }

    public setTitle(title: Text, modifier: Contributor, updateTime: DateTime): void {
        this.title = title;
        this.updateHistory(new TitleUpdated(updateTime, modifier, this.title));
    }

    public setDescription(description: Text, modifier: Contributor, updateTime: DateTime): void {
        this.description = description;
        this.updateHistory(new DescriptionUpdated(updateTime, modifier, this.description as Text));
    }

    public addCategory(category: TaskCategory, modifier: Contributor, updateTime: DateTime): void {
        this.categories.push(category);
        this.updateHistory(new CategoryAdded(updateTime, modifier, category));
    }

    public markAsFinished(completed:Completed): void {
        if(this.state instanceof Completed) return;
        this.state = completed;
        this.updateHistory(new TaskFinished(this.state.getCompletedDate(), this.state.getContributor()));
    }

    public markAsPending(pending: Pending): void {
        if(this.state instanceof Pending)return;
        this.state = pending;
        this.updateHistory(new TaskMarkedAsPending(this.state.getCompletedDate() as DateTime, this.state.getContributor() as Contributor));
    }

    public getTitle(): Text {
        return this.title;
    }

    public getDescription(): Text | None{
        if(!this.description)throw new InvalidOperation('Cannot get if not exists');
        return this.description;
    }

    public getPriority(): TaskPriority{
        return this.priority;
    }

    public getImageUrl(): Url | None{
       return this.urlImage;
    }

    public isFinished(): Completed | Pending {
        return this.state;
    }

    public getCategories(): TaskCategory[] {
        return [...this.categories]; 
    }

    public getStartDate(): DateTime | None{
        return this.startDate;
    }

    public getEndDate(): DateTime | None{
        return this.endDate;
    }

    public getIdList(): ID{
        return this.idList;
    }

    public getId(): ID{
        return this.id;
    }

    public getLastUpdate(): DateTime{
        return this.lastUpdate;
    }

    public getContributors(): Contributor[]{
        return [...this.contributors];
    }

    public getAttachments(): Url[]{
        return [...this.attachments];
    }

    public getNotes(): TaskNote[]{
        return [...this.notes];
    }

    public getHistory(): TaskEvent[]{
        return [...this.history];
    }
};
