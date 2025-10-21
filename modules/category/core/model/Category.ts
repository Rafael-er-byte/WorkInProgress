import MissingRequiredParameters from "../../../../shared/errors/core/MissingRequiredParameters";

export default class Category {
    private name!: string;
    private readonly idCategory!: string;
    private readonly idCreator!: string;
    private readonly createdAt?: string | undefined;

    constructor(name: string, idCreator: string, idCategory: string, createdAt: string) {
        if (!idCategory || idCategory?.trim().length === 0) throw new MissingRequiredParameters("id");
        if (!name || name?.trim().length === 0) throw new MissingRequiredParameters("category_name");
        if (!idCreator || idCreator?.trim().length === 0) throw new MissingRequiredParameters("id_creator");

        this.setName(name);
        this.idCategory = idCategory;
        this.idCreator = idCreator;
        this.createdAt = createdAt;
    }

    public getIdCategory(): string {
        return this.idCategory;
    }

    getName(): string {
        return this.name;
    }

    getIdCreator(): string {
        return this.idCreator;
    }

    getCreatedAt(): string | undefined {
        return this.createdAt;
    }

    public setName(name: string): void {
        if (!name || name.trim().length === 0) {
            throw new MissingRequiredParameters('category_name');
        }
        this.name = name;
    }
};
