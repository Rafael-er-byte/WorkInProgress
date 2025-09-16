export default class Category {
    private idCategory!: string;
    private name!: string;
    private idCreator!: string;
    private createdAt?: string | undefined;

    constructor(name: string, idCreator: string, idCategory: string, createdAt?: string | undefined) {
        this.setName(name);
        this.setIdCreator(idCreator);
        this.setIdCategory(idCategory);
        this.createdAt = createdAt;
    }

    // Getters
    public getIdCategory(): string {
        return this.idCategory;
    }

    public getName(): string {
        return this.name;
    }

    public getIdCreator(): string {
        return this.idCreator;
    }

    public getCreatedAt(): string | undefined {
        return this.createdAt;
    }

    // Setters
    public setIdCategory(idCategory: string): void {
        if (!idCategory || idCategory.trim().length === 0) {
            throw new Error('Invalid id');
        }
        this.idCategory = idCategory;
    }

    public setName(name: string): void {
        if (!name || name.trim().length === 0) {
            throw new Error('Invalid name of category');
        }
        this.name = name;
    }

    public setIdCreator(idCreator: string): void {
        if (!idCreator || idCreator.trim().length === 0) {
            throw new Error('Invalid user id');
        }
        this.idCreator = idCreator;
    }

    public setCreatedAt(createdAt?: string): void {
        this.createdAt = createdAt;
    }
}
