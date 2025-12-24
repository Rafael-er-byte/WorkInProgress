import InvalidOperation from "../../../../shared/core/errors/InvalidOperation";
import InvalidParameters from "../../../../shared/core/errors/InvalidParameters";
import MissingRequiredParameters from "../../../../shared/core/errors/MissingRequiredParameters";

export default class Task {
    private title!: string;
    private description?: string;
    private endDate?: string;
    private endTime?: string;
    private hasReminder: boolean = false;
    private finished: boolean = false;
    private categories: string[] = [];

    constructor(
        title: string,
        description?: string,
        endDate?: string,
        endTime?: string
    ) {
        this.setTitle(title);

        if (description) this.setDescription(description);
        if (endDate) this.setEndDate(endDate);
        if (endTime) this.setEndTime(endTime);
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

    public setEndDate(endDate: string): void {
        const parts = endDate.split('-');
        if (parts.length !== 3) {
            throw new InvalidParameters('Invalid date format', endDate);
        }

        if (!this.endTime) this.endTime = '12:00';

        const date = new Date(`${endDate}T${this.endTime}:00Z`);
        if (date.getTime() < Date.now()) {
            throw new InvalidParameters('End date must be in the future', endDate);
        }

        this.endDate = endDate;
    }

    public setEndTime(endTime: string): void {
        const parts = endTime.split(':');
        if (parts.length !== 2) {
            throw new InvalidParameters('Invalid time format', endTime);
        }

        if (!this.endDate) {
            this.endDate = new Date().toISOString().slice(0, 10);
        }

        const date = new Date(`${this.endDate}T${endTime}:00Z`);
        if (date.getTime() < Date.now()) {
            throw new InvalidParameters('End time must be in the future', endTime);
        }

        this.endTime = endTime;
    }

    public setReminder(): void {
        if (!this.endDate || !this.endTime) {
            throw new InvalidOperation('Needs to set a date and time for reminder');
        }
        this.hasReminder = true;
    }

    public removeReminder(): void {
        this.hasReminder = false;
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
}
