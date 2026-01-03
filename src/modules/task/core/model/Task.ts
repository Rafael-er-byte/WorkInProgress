import InvalidOperation from "../../../../shared/core/errors/InvalidOperation";
import InvalidParameters from "../../../../shared/core/errors/InvalidParameters";
import MissingRequiredParameters from "../../../../shared/core/errors/MissingRequiredParameters";
import Url from "../../../../shared/core/objects/URL";
import Schedule from "../objects/Schedule";
import { PRIORITY_LEVEL, type Priority } from "../types/Prioroty.type";

export default class Task {
    private title!: string;
    private priority!: Priority;
    private description?: string;
    private urlImage?:Url;
    private schedule?: Schedule;
    private finished: boolean = false;
    private categories: string[] = [];

    constructor(
        title: string,
        description?: string,
        priority:Priority = PRIORITY_LEVEL[0],
        urlImage?:string
    ) {
        this.setTitle(title);
        if (description) this.setDescription(description);
        if(urlImage) this.urlImage = new Url(urlImage);
        this.setPriority(priority);
    }

    public setPriority(priority: Priority): void{
        try {
            if(!PRIORITY_LEVEL.includes(priority))throw new InvalidParameters('Priority', priority);
        } catch (error) {
            throw new InvalidParameters('Priority', priority)
        }
        this.priority = priority;
    }

    public setDate(date:string): void{
        this.schedule = new Schedule(date);
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

    public getSchedule(): string{
        if(!this.schedule)throw new InvalidOperation('Cannot get if not exists');
        return this.schedule.getSchedule();
    }
};
