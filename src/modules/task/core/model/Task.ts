import InvalidOperation from "../../../../shared/core/errors/InvalidOperation";
import InvalidParameters from "../../../../shared/core/errors/InvalidParameters";
import MissingRequiredParameters from "../../../../shared/core/errors/MissingRequiredParameters";
import Url from "../../../../shared/core/objects/URL";
import type User from "../../../user/core/model/User";
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
    private contributors: string[] = [];
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
        this.setTitle(title);
        if (description) this.setDescription(description);
        if(urlImage) this.urlImage = new Url(urlImage);
        this.setPriority(priority);
    }

    private updateHistory(modifier: User, ): void{

    }

    public moveToList(idList:string): void{
        if(!idList)return;
        this.idList = idList;
    }

    public deleteContributor(user: User){
        this.contributors = this.contributors.filter(id => id !== user.getId());
    }

    public deleteAttachment(attachment: string): void{
        if(this.attachments.length === 0)return;
        this.attachments = this.attachments.filter(attach => attach.getUrl() !== attachment);
    }

    public addContributor(user:User): void{
        if(user.getId().trim().length === 0)throw new MissingRequiredParameters('User id');
        this.contributors.push(user.getId());
    }

    public addAtachment(attachment:string):void {
        const attach: Url = new Url(attachment);
        this.attachments.push(attach);
    }

    public setPriority(priority: Priority): void{
        try {
            if(!PRIORITY_LEVEL.includes(priority))throw new InvalidParameters('Priority', priority);
        } catch (error) {
            throw new InvalidParameters('Priority', priority)
        }
        this.priority = priority;
    }

    public setBeginDate(date:string): void{
        this.startDate = new Schedule(date);
    }

    public setEndDate(date:string): void{
        this.endDate = new Schedule(date);
    }

    public setUrlImage(url:string): void{
        this.urlImage = new Url(url);
    }

    public setTitle(title: string): void {
        if (!title || title.trim().length === 0) {
            throw new MissingRequiredParameters('Title');
        }
        this.title = title.trim();
    }

    public setDescription(description: string): void {
        if (!description || description.trim().length === 0) {
            throw new MissingRequiredParameters('Description');
        }
        this.description = description.trim();
    }

    public addCategory(categoryId: string): void {
        if (!categoryId || categoryId.trim().length === 0) {
            throw new MissingRequiredParameters('Category id');
        }
        this.categories.push(categoryId);
    }

    public removeCategory(categoryId: string): void {
        this.categories = this.categories.filter(id => id !== categoryId);
    }

    public markAsFinished(): void {
        this.finished = true;
    }

    public markAsPending(): void {
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

    public getContributors(): string[]{
        return [...this.contributors];
    }

    public getAttachments(): string[]{
        let attachment:string[] = [];

        this.attachments.map((attach) => attachment.push(attach.getUrl()));
        return attachment;
    }
};
