import type DateManager from "../../modules/shared/contracts/DateManager";

export default class ConcreteDateManager implements DateManager{
    private readonly isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    generate(): string {
        return new Date().toISOString();
    }

    validate(str: string): boolean {
        if (!this.isoRegex.test(str)) return false;

        const date = new Date(str);
        return !isNaN(date.getTime()) && str === date.toISOString();
    }
};