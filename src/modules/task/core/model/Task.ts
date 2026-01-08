import ConflictDuplicateResource from "../../../../shared/core/errors/ConflictDuplicatedResource";
import InvalidOperation from "../../../../shared/core/errors/InvalidOperation";
import InvalidParameters from "../../../../shared/core/errors/InvalidParameters";
import ResourceNotFoud from "../../../../shared/core/errors/ResourceNotFound";
import type Attachment from "../../../../shared/core/objects/Attachment";
import Contributor from "../../../../shared/core/objects/Contributor";
import DateTime from "../../../../shared/core/objects/DateTime";
import ID from "../../../../shared/core/objects/ID";
import None from "../../../../shared/core/objects/None";
import type Text from "../../../../shared/core/objects/Text";
import Note from "../../../note/core/model/Note";
import NoteContent from "../../../note/core/objects/NoteContent";
import TaskBusinessRules from "../constants/TaskBuisnessRules";
import AttachmentAdded from "../events/AttachmentAdded";
import AttachmentDeleted from "../events/AttachmentDeleted";
import BackgroundImageUpdated from "../events/BackgroundImageUpdated";
import BeginDateUpdated from "../events/BeginDateUpdated";
import CategoryAdded from "../events/CategoryAdded";
import CategoryDeleted from "../events/CategoryDeleted";
import ContributorAdded from "../events/ContributorAdded";
import ContributorDeleted from "../events/ContributorDeleted";
import DescriptionUpdated from "../events/DescriptionUpdated";
import EndDateUpdated from "../events/EndDateUpdated";
import NoteAdded from "../events/NoteAdded";
import PriorityUpdated from "../events/PriorityUpdated";
import TaskEvent from "../events/TaskEvent";
import TaskFinished from "../events/TaskFinished";
import TaskMarkedAsPending from "../events/TaskMarkedAsPending";
import TaskMoved from "../events/TaskMoved";
import TitleUpdated from "../events/TitleUpdated";
import Completed from "../objects/Completed";
import Pending from "../objects/Pending";
import TaskCategory from "../objects/TaskCategory";
import type TaskDescription from "../objects/TaskDescription";
import type TaskList from "../objects/TaskList";
import TaskNote from "../objects/TaskNote";
import type TaskPriority from "../objects/TaskPriority";
import type TaskTitle from "../objects/TaskTitle";

export default class Task {
    private title!: TaskTitle;
    private priority!: TaskPriority;
    private belongsTo!:TaskList;
    private lastUpdate!:DateTime;
    private state!: Completed | Pending;

    private description: TaskDescription | None = new None();
    private image: Attachment | None = new None();
    private startDate: DateTime | None = new None();
    private endDate: DateTime | None = new None();

    private categories: TaskCategory[] = [];
    private contributors: Contributor[] = [];
    private history: TaskEvent[] = [];
    private attachments: Attachment[] = [];
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

    public removeCategory(category: TaskCategory, modifier: Contributor): void {
        const deleteCategory = this.categories.find(c => c.getId() === category.getId());
        if(!deleteCategory)throw new ResourceNotFoud('This category doesnt exist in this task');
        this.categories = this.categories.filter(c => c.getId() !== category.getId());
        this.updateHistory(new CategoryDeleted(DateTime.now(), modifier, deleteCategory));
    }

    public removeContributor(contributor: Contributor, modifier: Contributor): void{
        const deleteContributor = this.contributors.find(c => c.getId() === contributor.getId());
        if(!deleteContributor)throw new ResourceNotFoud('This contributor doesnt exist in this task');
        this.contributors = this.contributors.filter(c => c.getId() !== contributor.getId());
        this.updateHistory(new ContributorDeleted(DateTime.now(), modifier, deleteContributor));
    }

    public deleteAttachment(attachment: Attachment, modifier: Contributor): void{
        const deleteAttachment = this.attachments.find(a => a.getUrl() === attachment.getUrl());
        if(!deleteAttachment)throw new ResourceNotFoud('This attachment doesnt exist in this task');
        this.attachments = this.attachments.filter(attach => attach.getUrl() !== attachment.getUrl());
        this.updateHistory(new AttachmentDeleted(DateTime.now(), modifier, deleteAttachment));
    }

    public moveToList(newList:TaskList, modifier: Contributor): void{
        this.belongsTo = newList;
        const nameList:Text = this.belongsTo.getName()
        this.updateHistory(new TaskMoved(DateTime.now(), modifier, nameList));
    }
    
    public addContributor(contributor:Contributor, modifier: Contributor): void{
        if(this.contributors.length + 1 > TaskBusinessRules.maxContributors())throw new InvalidOperation('Contributor limit exceeded');
        this.contributors.push(contributor);
        this.updateHistory(new ContributorAdded(DateTime.now(), modifier, contributor));
    }

    public addAtachment(attachment:Attachment, modifier: Contributor):void {
        if(this.attachments.length + 1 > TaskBusinessRules.maxAttachments())throw new InvalidOperation('Attachments limit exceeded');
        const exists = this.attachments.find(a => a.getUrl() === attachment.getUrl());
        if(exists) throw new ConflictDuplicateResource('This attachment already exists in this task', attachment);
        this.attachments.push(attachment);
        this.updateHistory(new AttachmentAdded(DateTime.now(), modifier, attachment));
    }

    public addNote(idNote:ID, creator:Contributor, content:Text): Note{
        if(this.notes.length + 1 > TaskBusinessRules.maxNotes())throw new InvalidOperation('Note limit exeeded')
        const exists = this.notes.find(savedNote => savedNote.getId() === idNote);
        if(exists)throw new ConflictDuplicateResource('This Note already exists', idNote);
        const newTaskNote = new TaskNote(idNote);

        const now = DateTime.now();
        const note = new Note(now, idNote, creator, this.id, new NoteContent(content));
        this.notes.push(newTaskNote);
        this.updateHistory(new NoteAdded(now, creator, newTaskNote));
        return note;
    }

    public setPriority(priority: TaskPriority, modifier: Contributor): void{
        this.priority = priority;
        this.updateHistory(new PriorityUpdated(DateTime.now(), modifier, priority));
    }

    public setBeginDate(date:DateTime, modifier: Contributor): void{
        if(!DateTime.isAfter(date, DateTime.now()))throw new InvalidParameters('The start date must be in future', date);
        if(this.endDate instanceof DateTime){
            if(!DateTime.isAfter(this.endDate, date))throw new InvalidParameters('The end date must be after the start date', {startDate:date, endDate:this.endDate});
        }
        this.startDate = date;
        this.updateHistory(new BeginDateUpdated(DateTime.now(), modifier, this.startDate as DateTime));
    }

    public setEndDate(date:DateTime, modifier: Contributor): void{
        if(!DateTime.isAfter(date, DateTime.now()))throw new InvalidParameters('The end date must be in future', date);
        if(this.startDate instanceof DateTime){
            if(!DateTime.isAfter(date, this.startDate))throw new InvalidParameters('The end date must be after the start date', {endDate:date, startDate:this.startDate});
        }
        this.endDate = date;
        this.updateHistory(new EndDateUpdated(DateTime.now(), modifier, this.endDate as DateTime));
    }

    public setImage(image:Attachment, modifier: Contributor): void{
        if(image.getType() !== 'image')throw new InvalidParameters('The resource must be an image');
        this.image = image;
        this.updateHistory(new BackgroundImageUpdated(DateTime.now(), modifier));
    }

    public setTitle(title: TaskTitle, modifier: Contributor): void {
        this.title = title;
        this.updateHistory(new TitleUpdated(DateTime.now(), modifier, this.title.getTitle()));
    }

    public setDescription(description: TaskDescription, modifier: Contributor): void {
        this.description = description;
        const descriptionText = description.getDescription();
        this.updateHistory(new DescriptionUpdated(DateTime.now(), modifier, descriptionText));
    }

    public addCategory(category: TaskCategory, modifier: Contributor): void {
        if(this.categories.length + 1 > TaskBusinessRules.maxCategories())throw new InvalidOperation('Categories limit exceeded');
        const exists = this.categories.find(c => c.getId() === category.getId());
        if(exists)throw new ConflictDuplicateResource('This category already exists in this task', category);
        this.categories.push(category);
        this.updateHistory(new CategoryAdded(DateTime.now(), modifier, category));
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

    public getIdList(): TaskList{
        return this.belongsTo;
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

    public getAttachments(): Attachment[]{
        return [...this.attachments];
    }

    public getNotes(): TaskNote[]{
        return [...this.notes];
    }

    public getHistory(): TaskEvent[]{
        return [...this.history];
    }

    public getCreationDate():DateTime{
        return this.createdAt;
    }
};
