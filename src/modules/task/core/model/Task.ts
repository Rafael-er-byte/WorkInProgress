import InvalidOperation from "../../../../shared/core/errors/InvalidOperation";
import InvalidParameters from "../../../../shared/core/errors/InvalidParameters";
import MissingRequiredParameters from "../../../../shared/core/errors/MissingRequiredParameters";
import type Contributor from "../../../../shared/core/objects/Contributor";
import type DateTime from "../../../../shared/core/objects/DateTime";
import type ID from "../../../../shared/core/objects/ID";
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
import type TaskEvent from "../Events/TaskEvent";
import TaskFinished from "../Events/TaskFinished";
import TaskMarkedAsPending from "../Events/TaskMarkedAsPending";
import TaskMoved from "../Events/TaskMoved";
import TitleUpdated from "../Events/TitleUpdated";
import type Completed from "../objects/Completed";
import type Pending from "../objects/Pending";
import TaskCategory from "../objects/TaskCategory";
import type TaskNote from "../objects/TaskNote";
import { PRIORITY_LEVEL, type Priority } from "../types/Prioroty.type";

export default class Task {
    private title!: Text;
    private priority!: Priority;
    private idList!:ID;
    private lastUpdate!:DateTime;

    private description?: Text;
    private urlImage?:Url;
    private startDate?: DateTime;
    private endDate?: DateTime;

    private finished!: Completed | Pending;
    private categories: TaskCategory[] = [];
    private contributors: Contributor[] = [];
    private history: TaskEvent[] = [];
    private attachments: Url[] = [];
    private notes: TaskNote[] = [];

    private readonly id!:ID
    private readonly createdAt!:DateTime;

    constructor(
        id: ID,
        idList:ID,
        createdAt:Text,
        title: Text,
        history: TaskEvent[],
        attachments: Url[],
        notes: TaskNote[],
        contributors: Contributor[],
        finished: boolean,
        startDate:DateTime,
        endDate:DateTime,
        lastUpdate:DateTime,
        categories:TaskCategory[],
        priority:Priority = PRIORITY_LEVEL[0],
        description?: Text,
        urlImage?:Text

    ) {
        
    }

    private updateHistory(event:TaskEvent, updateTime:DateTime): void{
        this.history.push(event);
        this.lastUpdate = updateTime;
    }

    public removeCategory(category: TaskCategory, modifier: Contributor): void {
        this.categories = this.categories.filter(c => c.getId() !== category.getId());
        this.updateHistory(new CategoryDeleted(modifier, category));
    }

    public deleteContributor(contributor: Contributor, modifier: Contributor){
        this.contributors = this.contributors.filter(c => c.getId() !== contributor.getId());
        this.updateHistory(new ContributorDeleted(modifier, contributor));
    }

    public deleteAttachment(attachment: Url, modifier: Contributor): void{
        if(this.attachments.length === 0)return;
        this.attachments = this.attachments.filter(attach => attach.getUrl() !== attachment.getUrl());
        this.updateHistory(new AttachmentDeleted(modifier, attachment));
    }

    public moveToList(idList:Text, nameList:Text, modifier: Contributor): void{
        if(!idList)return;
        this.idList = idList;
        this.updateHistory(new TaskMoved(modifier, nameList));
    }

    public addContributor(contributor:Contributor, modifier: Contributor): void{
        if(contributor.getId().trim().length === 0)throw new MissingRequiredParameters('Contributor id');
        this.contributors.push(contributor);
        this.updateHistory(new ContributorAdded(modifier, contributor));
    }

    public addAtachment(attachment:Url, modifier: Contributor):void {
        this.attachments.push(attachment);
        this.updateHistory(new AttachmentAdded(modifier, attachment));
    }

    public setPriority(priority: Priority, modifier: Contributor): void{
        try {
            if(!PRIORITY_LEVEL.includes(priority))throw new InvalidParameters('Priority', priority);
        } catch (error) {
            throw new InvalidParameters('Priority', priority)
        }
        this.priority = priority;

        this.updateHistory(new PriorityUpdated(modifier, priority));
    }

    public setBeginDate(date:Text, modifier: Contributor): void{
        this.startDate = new DateTime(date);
        this.updateHistory(new BeginDateUpdated(modifier, this.startDate));
    }

    public setEndDate(date:Text, modifier: Contributor): void{
        this.endDate = new DateTime(date);
        this.updateHistory(new EndDateUpdated(modifier, this.endDate));
    }

    public setUrlImage(url:Text, modifier: Contributor): void{
        this.urlImage = new Url(url);
        this.updateHistory(new BackgroundImageUpdated(modifier));
    }

    public setTitle(title: Text, modifier: Contributor): void {
        if (!title || title.trim().length === 0) {
            throw new MissingRequiredParameters('Title');
        }
        this.title = title.trim();
        this.updateHistory(new TitleUpdated(modifier, this.title));
    }

    public setDescription(description: Text, modifier: Contributor): void {
        if (!description || description.trim().length === 0) {
            throw new MissingRequiredParameters('Description');
        }
        this.description = description.trim();
        this.updateHistory(new DescriptionUpdated(modifier, this.description));
    }

    public addCategory(category: TaskCategory, modifier: Contributor): void {
        this.categories.push(category);
        this.updateHistory(new CategoryAdded(modifier, category));
    }

    public markAsFinished(modifier: Contributor): void {
        this.finished = true;
        this.updateHistory(new TaskFinished(modifier));
    }

    public markAsPending(modifier: Contributor): void {
        this.finished = false;
        this.updateHistory(new TaskMarkedAsPending(modifier));
    }

    public getTitle(): Text {
        return this.title;
    }

    public getDescription(): Text{
        if(!this.description)throw new InvalidOperation('Cannot get if not exists');
        return this.description;
    }

    public getPriority(): Priority{
        return this.priority;
    }

    public getImageUrl(): Text{
        if(!this.urlImage)throw new InvalidOperation('Cannot get if not exists');
        return this.urlImage!.getUrl();
    }

    public isFinished(): boolean {
        return this.finished;
    }

    public getCategories(): TaskCategory[] {
        return [...this.categories]; 
    }

    public getStartDate(): Text{
        if(!this.startDate)throw new InvalidOperation('Cannot get if not exists');
        return this.startDate.getDateTime();
    }

    public getEndDate(): Text{
        if(!this.endDate)throw new InvalidOperation('Cannot get if not exists');
        return this.endDate.getDateTime();
    }

    public getIdList(): Text{
        return this.idList;
    }

    public getId(): Text{
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
