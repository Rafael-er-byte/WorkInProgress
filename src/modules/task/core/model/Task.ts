import InvalidOperation from "../../../../shared/core/errors/InvalidOperation";
import InvalidParameters from "../../../../shared/core/errors/InvalidParameters";
import MissingRequiredParameters from "../../../../shared/core/errors/MissingRequiredParameters";
import type Contributor from "../../../../shared/core/objects/Contributor";
import Schedule from "../../../../shared/core/objects/Schedule";
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
import TaskCategory from "../objects/TaskCategory";
import type TaskNote from "../objects/TaskNote";
import { PRIORITY_LEVEL, type Priority } from "../types/Prioroty.type";

export default class Task {
    private title!: string;
    private priority!: Priority;
    private idList!:string;
    private lastUpdate!:Schedule;

    private description?: string;
    private urlImage?:Url;
    private startDate?: Schedule;
    private endDate?: Schedule;

    private finished: boolean = false;
    private categories: TaskCategory[] = [];
    private contributors: Contributor[] = [];
    private history: TaskEvent[] = [];
    private attachments: Url[] = [];
    private notes: TaskNote[] = [];

    private readonly id!:string
    private readonly createdAt!:string;

    constructor(
        id: string,
        idList:string,
        createdAt:string,
        title: string,
        history: TaskEvent[],
        attachments: Url[],
        notes: TaskNote[],
        contributors: Contributor[],
        finished: boolean,
        startDate:Schedule,
        endDate:Schedule,
        lastUpdate:Schedule,
        categories:TaskCategory[],
        priority:Priority = PRIORITY_LEVEL[0],
        description?: string,
        urlImage?:string

    ) {
        if(!id || !idList || !createdAt)throw new MissingRequiredParameters('This parameters id, idList, createdAt are Required');
        this.id = id;
        this.idList = idList;
        this.createdAt = createdAt;
        if (!title || title.trim().length === 0) {
            throw new MissingRequiredParameters('Title');
        }
        this.title = title.trim();
        if (description && description.trim().length !== 0) {
            this.description = description.trim();
        }

        if(urlImage) this.urlImage = new Url(urlImage);
        if(priority && PRIORITY_LEVEL.includes(priority)) this.priority = priority;
    }

    private updateHistory(event:TaskEvent): void{
        this.history.push(event);
        this.lastUpdate = new Schedule(new Date().toISOString());
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

    public moveToList(idList:string, nameList:string, modifier: Contributor): void{
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

    public setBeginDate(date:string, modifier: Contributor): void{
        this.startDate = new Schedule(date);
        this.updateHistory(new BeginDateUpdated(modifier, this.startDate));
    }

    public setEndDate(date:string, modifier: Contributor): void{
        this.endDate = new Schedule(date);
        this.updateHistory(new EndDateUpdated(modifier, this.endDate));
    }

    public setUrlImage(url:string, modifier: Contributor): void{
        this.urlImage = new Url(url);
        this.updateHistory(new BackgroundImageUpdated(modifier));
    }

    public setTitle(title: string, modifier: Contributor): void {
        if (!title || title.trim().length === 0) {
            throw new MissingRequiredParameters('Title');
        }
        this.title = title.trim();
        this.updateHistory(new TitleUpdated(modifier, this.title));
    }

    public setDescription(description: string, modifier: Contributor): void {
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

    public getTitle(): string {
        return this.title;
    }

    public getDescription(): string{
        if(!this.description)throw new InvalidOperation('Cannot get if not exists');
        return this.description;
    }

    public getPriority(): Priority{
        return this.priority;
    }

    public getImageUrl(): string{
        if(!this.urlImage)throw new InvalidOperation('Cannot get if not exists');
        return this.urlImage!.getUrl();
    }

    public isFinished(): boolean {
        return this.finished;
    }

    public getCategories(): TaskCategory[] {
        return [...this.categories]; 
    }

    public getStartDate(): string{
        if(!this.startDate)throw new InvalidOperation('Cannot get if not exists');
        return this.startDate.getSchedule();
    }

    public getEndDate(): string{
        if(!this.endDate)throw new InvalidOperation('Cannot get if not exists');
        return this.endDate.getSchedule();
    }

    public getIdList(): string{
        return this.idList;
    }

    public getId(): string{
        return this.id;
    }

    public getLastUpdate(): Schedule{
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
