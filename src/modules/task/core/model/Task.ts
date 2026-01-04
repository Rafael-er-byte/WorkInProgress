import InvalidOperation from "../../../../shared/core/errors/InvalidOperation";
import InvalidParameters from "../../../../shared/core/errors/InvalidParameters";
import MissingRequiredParameters from "../../../../shared/core/errors/MissingRequiredParameters";
import Url from "../../../../shared/core/objects/URL";
import type Contributor from "../objects/Contributor";
import Schedule from "../objects/Schedule";
import { PRIORITY_LEVEL, type Priority } from "../types/Prioroty.type";

export default class Task {
    private title!: string;
    private priority!: Priority;
    private idList!:string;
    private lastUpdate!:string;

    private description?: string;
    private urlImage?:Url;
    private startDate?: Schedule;
    private endDate?: Schedule;

    private finished: boolean = false;
    private categories: string[] = [];
    private contributors: Contributor[] = [];
    private history: string[] = [];
    private attachments: Url[] = []

    private readonly id!:string
    private readonly createdAt!:string;

    constructor(
        id: string,
        idList:string,
        createdAt:string,
        title: string,
        description?: string,
        priority:Priority = PRIORITY_LEVEL[0],
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

    private updateHistory(modifier: Contributor, ): void{

    }

    public moveToList(idList:string, nameList:string, modifier: Contributor): void{
        if(!idList)return;
        this.idList = idList;
    }

    public deleteContributor(contributor: Contributor, modifier: Contributor){
        this.contributors = this.contributors.filter(c => c.getId() !== contributor.getId());
    }

    public deleteAttachment(attachment: string, modifier: Contributor): void{
        if(this.attachments.length === 0)return;
        this.attachments = this.attachments.filter(attach => attach.getUrl() !== attachment);
    }

    public addContributor(contributor:Contributor, modifier: Contributor): void{
        if(contributor.getId().trim().length === 0)throw new MissingRequiredParameters('Contributor id');
        this.contributors.push(contributor);
    }

    public addAtachment(attachment:string, modifier: Contributor):void {
        const attach: Url = new Url(attachment);
        this.attachments.push(attach);
    }

    public setPriority(priority: Priority, modifier: Contributor): void{
        try {
            if(!PRIORITY_LEVEL.includes(priority))throw new InvalidParameters('Priority', priority);
        } catch (error) {
            throw new InvalidParameters('Priority', priority)
        }
        this.priority = priority;
    }

    public setBeginDate(date:string, modifier: Contributor): void{
        this.startDate = new Schedule(date);
    }

    public setEndDate(date:string, modifier: Contributor): void{
        this.endDate = new Schedule(date);
    }

    public setUrlImage(url:string, modifier: Contributor): void{
        this.urlImage = new Url(url);
    }

    public setTitle(title: string, modifier: Contributor): void {
        if (!title || title.trim().length === 0) {
            throw new MissingRequiredParameters('Title');
        }
        this.title = title.trim();
    }

    public setDescription(description: string, modifier: Contributor): void {
        if (!description || description.trim().length === 0) {
            throw new MissingRequiredParameters('Description');
        }
        this.description = description.trim();
    }

    public addCategory(categoryId: string, modifier: Contributor): void {
        if (!categoryId || categoryId.trim().length === 0) {
            throw new MissingRequiredParameters('Category id');
        }
        this.categories.push(categoryId);
    }

    public removeCategory(categoryId: string, modifier: Contributor): void {
        this.categories = this.categories.filter(id => id !== categoryId);
    }

    public markAsFinished(modifier: Contributor): void {
        this.finished = true;
    }

    public markAsPending(modifier: Contributor): void {
        this.finished = false;
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

    public getCategories(): string[] {
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

    public getContributors(): Contributor[]{
        return [...this.contributors];
    }

    public getAttachments(): string[]{
        let attachment:string[] = [];

        this.attachments.map((attach) => attachment.push(attach.getUrl()));
        return attachment;
    }
};
